import React from "react";
import Sidebar from "./Home Comp/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import Home from "./Home";

function HomePage() {
  return (
    <>
      <Home protect={true}>
        <Sidebar />
        {/* <MessageContainer /> */}
      </Home>
    </>
  );
}

export default HomePage;
