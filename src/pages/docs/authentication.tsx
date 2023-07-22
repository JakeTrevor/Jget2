import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Token from "~/components/token";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>JGET docs</title>
      </Head>
      <main className="flex flex-col items-center bg-base-200 p-10">
        <h2 className="self-start text-2xl font-bold">Authentication</h2>
        <div className="divider" />
        <div className="flex w-3/4 flex-col rounded-md bg-white p-4">
          <p>
            <span className="text-xl font-bold">Packages have authors;</span> a
            simple statement, but very important. Not just anyone can edit any
            old package! You need to have permission to do that. That's quite a
            simple check, but it requires that we know who is making an edit
            request when they run <code>JGET put</code>.
          </p>
          <p>
            This is called authentication, and it's quite hard. So hard, in
            fact, that JGET largely does not do it. We don't store passwords or
            anything of that nature in the JGET database - you have to log in
            with github. So how do we authenticate API requests?
          </p>
          <p>
            <span className="text-xl font-bold">
              That's what access tokens are for.
            </span>{" "}
            To make an access token, we do two things: first, we generate some
            random text. This gets stored in our database along side the name
            for the token (so you can identify it). We then encrypt the text
            using a secret only JGET knows. This is called cryptographic
            signing, and it allows us to prove that the whatever got encrypted
            comes from us. This encrypted text is your access token. You give
            this token to the JGET client in minecraft, and it gets sent along
            with all your put requests. JGET can then decrypt the token, and
            check which user it belongs to. So long as you keep your tokens a
            secret, this means that only you can make changes to your packages.
          </p>
          <p>
            This obviously means that{" "}
            <span className="text-xl font-bold">
              you should be careful with your access tokens!
            </span>{" "}
            Here are a few best-practise recommendations you should follow to
            keep your account secure:
          </p>
          <ol>
            <li>Don't share your access tokens with anyone you don't trust.</li>
            <li>
              Try to avoid pushing to JGET from public servers where there are
              people you don't know who could get access to your tokens.
            </li>
            <li>
              If you do push from a public server, log out of JGET when you
              aren't using it. You don't have to generate a new access token
              each time; just keep it in notepad or similar for easy access.
            </li>
            <li>
              Use multiple tokens; One of the big advantages of access tokens is
              that you can create and delete them at will without damaging your
              account. consider having separate tokens for each server you play
              on, so you can remove just one without having to log back in to
              all your clients.
            </li>
          </ol>
        </div>
      </main>
    </>
  );
};

export default Profile;
