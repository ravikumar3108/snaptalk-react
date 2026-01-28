import React, { Children } from "react";
import Home from "./Home";

function Layout({ children, protect }) {
  return (
    <div>
      <Home protect={true}>{children}</Home>
    </div>
  );
}

export default Layout;
