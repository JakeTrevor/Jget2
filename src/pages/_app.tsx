import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import Layout from "~/components/layout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const title = localFont({
  src: "./font/title.ttf",
  variable: "--font-title",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Toaster />
      <main className={title.variable} data-theme="main">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
