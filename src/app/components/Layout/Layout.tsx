import React, { ReactNode } from "react";

export type PropsLayout = {
  children: ReactNode;
};

function Layout({ children }: PropsLayout) {
  return (
    <div className="layout">
      <div>Header</div>
      <div className="wrapper">{children}</div>
    </div>
  );
}
export default Layout;
