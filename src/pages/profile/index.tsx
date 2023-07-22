import { type NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const Profile: NextPage = () => {
  let router = useRouter();
  return (
    <main className="grid h-[93vh] grid-cols-4 items-center gap-5 bg-base-200 p-10">
      <div className="col-span-3 flex h-full flex-col">
        <h2 className="text-2xl font-bold">username</h2>
        <div className="divider" />
        <div className="stats mb-5">
          <div className="stat">
            <div className="stat-title">Total Downloads</div>
            <div className="stat-value text-primary">{0}</div>
          </div>
          <div className="stat">
            <div className="stat-title">total Uploads</div>
            <div className="stat-value text-primary">{12}</div>
          </div>
          <div className="stat">
            <div className="stat-title">3rd stat</div>
            <div className="stat-value text-primary">urmom</div>
          </div>
        </div>
        <span className="flex flex-row justify-around">
          <Link href="/profile/tokens" className="btn-outline btn">
            Manage Access Tokens
          </Link>
          <button className="btn-error btn">delete account</button>
        </span>
      </div>
      <div className="col-start-4 flex h-full flex-col justify-start">
        <Image
          src={"/profile.webp"}
          alt="profile picture"
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
      <div className="col-span-4 flex w-5/6 flex-row flex-wrap justify-center">
        your packages
      </div>
    </main>
  );
};

export default Profile;
