import { type AppType } from "next/app";
import localFont from "next/font/local";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "~/components/layout";

const title = localFont({
  src: "./font/title.ttf",
  variable: "--font-title",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={title.variable} data-theme="lofi">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};

export default api.withTRPC(MyApp);
