import "~/styles/globals.css";

import { Inter, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "~/components/ui/theme";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "~/components/session-provider";

const title = localFont({
  src: "../fonts/title.ttf",
  display: "swap",
  variable: "--font-title",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const scp = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata = {
  title: "JGET",
  description: "JGET Package Manager",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const dynamic = "force-dynamic";
// TODO see if we can get rid of this ^

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          title.variable,
          inter.variable,
          scp.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider cookies={cookies().toString()}>
              <Toaster />
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
