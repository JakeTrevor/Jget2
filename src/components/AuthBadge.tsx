import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import type { FC } from "react";

const AuthBadge: FC = () => {
  return (
    <>
      <ClerkLoading>
        <div className="ml-auto mr-1 h-8 w-8 animate-pulse rounded-full bg-slate-200" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className="ml-auto mr-1">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button
              className="tooltip tooltip-bottom ml-auto mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
              data-tip="Sign in"
            >
              <LogIn className="-translate-x-1" size={26} />
            </button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
};

export default AuthBadge;
