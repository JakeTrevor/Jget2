export default function FilterControls() {
  return (
    <div className="rounded-box flex h-full w-full flex-col bg-base-100 p-4">
      <h1 className="border-b-2 border-secondary p-1 text-2xl">
        Filter Packages
      </h1>
      <h2>sort:</h2>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Alphabetical</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-secondary"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Downloads</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-secondary"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Recent</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-secondary"
          />
        </label>
      </div>
    </div>
  );
}
