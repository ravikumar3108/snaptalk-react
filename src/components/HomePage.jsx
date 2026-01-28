import React from "react";
import Sidebar from "./Home Comp/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import Home from "./Home";
import useConversation from "../components/Zustand/useConversation"; // Zustand store import karein

function HomePage() {
  const { selectedConversation } = useConversation();

  return (
    <Home protect={true}>
      {/* Mobile par logic: 
        1. Agar chat selected hai toh Sidebar chhupa do (hidden), warna dikhao (flex).
        2. Tablet/Desktop (md breakpoint) par dono humesha dikhenge (md:flex).
      */}
      <div
        className={`${selectedConversation ? "hidden" : "flex"} md:flex h-full w-full md:w-auto border-r border-[#313d45]/50`}
      >
        <Sidebar />
      </div>

      {/* Mobile par logic:
        1. Agar chat selected NAHI hai toh MessageContainer chhupa do (hidden).
        2. Agar chat selected HAI toh full screen par dikhao (flex).
      */}
      <div
        className={`${!selectedConversation ? "hidden" : "flex"} md:flex flex-1 h-full`}
      >
        <MessageContainer />
      </div>
    </Home>
  );
}

export default HomePage;
