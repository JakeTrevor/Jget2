import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Token from "~/components/token";

const Profile: NextPage = () => {
  let router = useRouter();
  return (
    <main className="flex h-[93vh] flex-col items-center bg-base-200 p-10">
      <h2 className="self-start text-2xl font-bold">
        Your{" "}
        <Link
          href="/docs/authentication"
          className="tooltip underline decoration-dotted"
          data-tip="What is this?"
        >
          access tokens
        </Link>
      </h2>
      <div className="divider" />
      <div className="flex w-3/4 flex-col rounded-md bg-white p-4">
        <Token />
        <Token />
        <Token />
        <Token />
        <Token />
      </div>
    </main>
  );
};

export default Profile;
