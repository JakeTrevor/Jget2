local ensure_width = require "cc.strings".ensure_width

do --settings block
    settings.define("JGET.outdir",
        { description = "Directory packages are installed into", default = "./packages/", type = "string" })
    settings.define("JGET.endpoint",
        {
            description = "Location of JGET webserver. Uses master server as default",
            default = "http://localhost:3000/api/package/",
            type = "string"
        })
end

local endpoint = settings.get("JGET.endpoint")
local outdir = shell.resolve(settings.get("JGET.outdir"))
local w, _h = term.getSize()

---@param e string
local function printError(e)
    term.setTextColor(colors.red)
    print(e)
    term.setTextColor(colors.white)
end

---@param s string
local function printSuccess(s)
    term.setTextColor(colors.green)
    print(s)
    term.setTextColor(colors.white)
end

---@param s string
local function printGray(s)
    term.setTextColor(colors.gray)
    write(s)
    term.setTextColor(colors.white)
end

---@param dirname string
local function ensure(dirname)
    if not fs.exists(dirname) then
        fs.makeDir(dirname)
    end
end

local function send_request(args)
    http.request(args)

    local requesting = true

    local response, reason, failResponse

    while requesting do
        local event, sourceText
        event, _, sourceText, failResponse = os.pullEvent()

        if event == "http_success" then
            ---@type Response
            response = sourceText
            requesting = false
        elseif event == "http_failure" then
            reason = sourceText
            requesting = false
        end
    end

    if not response then
        if not failResponse then
            return false, reason
        end


        ---@diagnostic disable-next-line: param-type-mismatch
        local data = textutils.unserialiseJSON(failResponse.readAll())

        if (data) then
            return false, data.message
        end

        return false, "unspecified error"
    end


    if response.getResponseCode() ~= 200 then
        return false, "HTTP code " .. response.getResponseCode()
    end

    ---@diagnostic disable-next-line: param-type-mismatch
    local data = textutils.unserialiseJSON(response.readAll())

    if not data then
        return false, "request did not provide data"
    end

    return true, data
end

local function get_installed_packages()
    if (not fs.exists(outdir)) then return {} end
    return fs.list(outdir)
end

local function list()
    local pkgs = get_installed_packages()
    if (#pkgs == 0) then
        printError("no packages installed")
        return
    end

    printSuccess("installed packages:")
    for _, v in ipairs(pkgs) do
        print("- " .. v)
    end
end


---@param dirname string
local function install(dirname, files)
    ensure(dirname)
    for fname, value in pairs(files) do
        local file_path = fs.combine(dirname, fname)
        if type(value) == "string" then
            --its a file
            local file = fs.open(file_path, "w")
            if (file) then
                file.write(value)
                file.close()
            else
                error("Failed to write file")
            end
        else
            --its a directory
            install(file_path, value)
        end
    end
end

---@param pkg_name string
local function fetch_pkg(pkg_name)
    printGray("getting package ")

    local targetSize = w - #"getting package " - #"Success!"
    write(ensure_width(pkg_name, targetSize))


    local target_url = endpoint .. pkg_name

    local success, data = send_request({
        url = target_url, method = "GET",
    })

    if not success then
        printError(" Failed!")
        ---@diagnostic disable-next-line: param-type-mismatch
        printError(data)
        return false
    end

    local files = textutils.unserialiseJSON(data["files"])

    ensure(outdir)

    local install_dir = fs.combine(outdir, pkg_name)
    install(install_dir, files)

    printSuccess("Success!")

    ---@type string[]
    local dependencies = data["dependencies"]
    return true, dependencies
end

local function get(arg)
    local package = arg[2]

    if package == nil then
        printError("Please provide a package to install")
        return
    end

    local packages = {}
    local head, tail = 1, 0

    local downloaded_pkgs = {}

    while package do
        if not (downloaded_pkgs[package]) then
            local success, deps = fetch_pkg(package)

            if (success) then
                if deps then
                    for _, v in ipairs(deps) do
                        packages[head] = v
                        head = head + 1
                    end
                end
                downloaded_pkgs[package] = true
            end
        end
        tail = tail + 1
        package = packages[tail]
    end
end

-- TODO deprecate this?
local function init(args)
    local package_name = args[2]

    if not package_name then
        write("Please provide a package")
        return
    end

    ensure("packages/")
    ensure("packages/" .. package_name)


    print("Initialised package " .. package_name)
    print("in packages/" .. package_name)
end

local function get_files(path)
    local data = {}
    local file_names = fs.list(path)

    for _, file_name in ipairs(file_names) do
        if not (file_name == "packages") then
            local file_path = fs.combine(path, file_name)

            if fs.isDir(file_path) then
                data[file_name] = get_files(file_path)
            else
                local file = fs.open(file_path, "r")
                if (file) then
                    data[file_name] = file.readAll()
                    file.close()
                else
                    printError("failed to read file")
                end
            end
        end
    end
    return data
end

local function get_dependencies(path)
    local dep_file = shell.resolve(path .. "/DEPENDENCIES.txt")
    local dep_arr = {}
    local head = 1

    if (not fs.exists(dep_file)) then
        return textutils.empty_json_array
    end

    local file = fs.open(dep_file, "r")
    if file then
        local next_line = file.readLine();
        while (next_line) do
            dep_arr[head] = next_line
            head = head + 1;
            next_line = file.readLine()
        end
    else
        printError("failed to read dependencies")
    end

    return dep_arr or textutils.empty_json_array
end

local function put(args)
    local package_name = args[2]

    if not package_name then
        printError("Please provide a package")
        return
    end

    local package_dir = shell.resolve(outdir .. '/' .. package_name)

    if not fs.exists(package_dir) then
        printError("The directory `" .. package_dir .. "` does not exist")
        printError("If your package is written somewhere else, please move it there")
        return
    end

    local data = {}
    local files = get_files(package_dir)

    data["files"] = textutils.serialiseJSON(files)
    data["dependencies"] = get_dependencies(package_dir)

    local json_data = textutils.serialiseJSON(data)

    local target_url = endpoint .. package_name

    printGray("Putting package ")
    local targetSize = w - #"Putting package " - #"Success!"
    write(ensure_width(package_name, targetSize))


    local success, err = send_request({
        url = target_url,
        body = json_data,
        method = "PUT",
        headers = { ["Content-Type"] = "application/json" }
    })

    if (success) then
        printSuccess("Success!")
    else
        printError(" Failed!")
        ---@diagnostic disable-next-line: param-type-mismatch
        printError(err)
    end
end

local function usage()
    print()
    term.setTextColor(colors.gray)
    print("Usage:")
    term.setTextColor(colors.white)
end

---@param text string
local function bulletPoint(text)
    term.setTextColor(colors.gray)
    write("- ")
    term.setTextColor(colors.white)
    print(text)
end

local help_dict = {
    list = function()
        usage()
        printSuccess("  jget list")
        print()
        bulletPoint("Lists all installed packages")
    end,
    get = function()
        usage()
        term.setTextColor(colors.green)
        write("  jget get ")
        term.setTextColor(colors.blue)
        print("<package name>")
        term.setTextColor(colors.white)

        print()
        bulletPoint("Requests the specified package from the JGET repo")
        bulletPoint("Installed the package in the outdir")
        bulletPoint("By default './packages/'")
    end,
    put = function()
        usage()
        term.setTextColor(colors.green)
        write("  jget put ")
        term.setTextColor(colors.blue)
        print("<package name>")
        term.setTextColor(colors.white)
        print()

        bulletPoint("Upload (or update) a package on JGET")
        term.setTextColor(colors.gray)
        write("- ")
        term.setTextColor(colors.white)
        write("Looks for the package files in '")
        term.setTextColor(colors.blue)
        write("<outdir>")
        term.setTextColor(colors.white)
        write("/")
        term.setTextColor(colors.blue)
        write("<package name>")
        term.setTextColor(colors.white)
        print("/`")


        term.setTextColor(colors.gray)
        write("- ")
        term.setTextColor(colors.white)
        write("i.e. '")
        term.setTextColor(colors.blue)
        write(outdir)
        term.setTextColor(colors.white)
        write("/")
        term.setTextColor(colors.blue)
        write("<package name>")
        term.setTextColor(colors.white)
        print("/`")
    end,
    init = function()
        usage()
        printSuccess("  jget init")

        bulletPoint("creates a directory in the `/packages/` folder")
    end
    ,
    help = function()
        usage()
        term.setTextColor(colors.green)
        write("  jget help ")
        term.setTextColor(colors.blue)
        print("<command>")
        term.setTextColor(colors.white)
        print()


        bulletPoint("Print help for a command")
        bulletPoint("For a list of availible commands type")
        print()
        printSuccess("  jget")
        print()
        bulletPoint("If you're looking for more information about using JGET, checkout the documentation:")
        print()
        printSuccess("  https://jget.trevor.business/docs/")
    end,
}

---@param arg string[]
local function jget_help(arg)
    local command = arg[2]

    if not command then
        help_dict.help()
        print()
        return
    end

    if help_dict[command] then
        help_dict[command]()
        print()
    else
        print()
        term.setTextColor(colors.red)
        write("    Command ")
        term.setTextColor(colors.white)
        write("'" .. command .. "'")
        term.setTextColor(colors.red)
        print(" not recognised.")

        print()
        print()
    end
end

local commands = {
    ["list"] = list,
    ["get"] = get,
    ["put"] = put,
    ["init"] = init,
    ["help"] = jget_help
}


local function main(args)
    local command = arg[1]
    if not command then
        usage()
        term.setTextColor(colors.green)
        write("  jget ")
        term.setTextColor(colors.blue)
        print("<command> [args]")
        term.setTextColor(colors.white)
        print()
        print("Commands:")
        for name, _ in pairs(commands) do
            bulletPoint(name)
        end
        print()
        return
    end

    if commands[command] then
        commands[command](args)
    else
        print()
        term.setTextColor(colors.red)
        write("unrecognised command: ")

        term.setTextColor(colors.white)
        print("'" .. command .. "'")
        print()
    end
end

main(arg)
