import { type AppType } from "next/app";
import localFont from "next/font/local";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/header";

// Font files can be colocated inside of `pages`
const title = localFont({ src: "./font/title.ttf" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={title.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
