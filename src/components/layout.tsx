import type { FC, ReactNode } from "react";
import Header from "./header";

let Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
