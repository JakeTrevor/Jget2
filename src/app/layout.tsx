import "~/styles/globals.css";

import { Inter, Source_Code_Pro } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";

import { Header } from "./header";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/ui/theme";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster />
            <Header />
            {children}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
