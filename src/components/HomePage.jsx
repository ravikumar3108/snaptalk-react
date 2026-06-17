// import React from "react";
// import Sidebar from "./Home Comp/Sidebar";
// import MessageContainer from "./Messages/MessageContainer";
// import Home from "./Home";
// import useConversation from "../components/Zustand/useConversation"; // Zustand store import karein

// function HomePage() {
//   const { selectedConversation } = useConversation();

//   return (
//     <Home protect={true}>
//       {/* Mobile par logic: 
//         1. Agar chat selected hai toh Sidebar chhupa do (hidden), warna dikhao (flex).
//         2. Tablet/Desktop (md breakpoint) par dono humesha dikhenge (md:flex).
//       */}
//       <div
//         className={`${selectedConversation ? "hidden" : "flex"} md:flex h-full w-full md:w-auto border-r border-[#313d45]/50`}
//       >
//         <Sidebar />
//       </div>

//       {/* Mobile par logic:
//         1. Agar chat selected NAHI hai toh MessageContainer chhupa do (hidden).
//         2. Agar chat selected HAI toh full screen par dikhao (flex).
//       */}
//       <div
//         className={`${!selectedConversation ? "hidden" : "flex"} md:flex flex-1 h-full`}
//       >
//         <MessageContainer />
//       </div>
//     </Home>
//   );
// }

// export default HomePage;



import React from "react";
import Sidebar from "./Home Comp/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import Home from "./Home";
import Profile from "./User/Profile";
import StatusViewer from "./User/StatusViewer";

import useConversation from "../components/Zustand/useConversation";

function HomePage() {
  const {
    selectedConversation,
    activeView,
  } = useConversation();

  return (
    <Home protect={true}>
      {/* Sidebar */}
      <div
        className={`${selectedConversation ||
            activeView === "profile" ||
            activeView === "status"
            ? "hidden"
            : "flex"
          } md:flex h-full border-r border-[#313d45]/50`}
      >
        <Sidebar />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-1 h-full">
        {activeView === "profile" ? (
          <Profile />
        ) : activeView === "status" ? (
          <StatusViewer />
        ) : activeView === "chat" &&
          selectedConversation ? (
          <MessageContainer />
        ) : (
          <div className="flex flex-1 items-center justify-center bg-[#222e35] text-[#8696a0]">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Mobile Chat */}
      <div
        className={`${activeView === "chat"
            ? "flex"
            : "hidden"
          } md:hidden flex-1 h-full`}
      >
        <MessageContainer />
      </div>

      {/* Mobile Profile */}
      <div
        className={`${activeView === "profile"
            ? "flex"
            : "hidden"
          } md:hidden flex-1 h-full`}
      >
        <Profile />
      </div>

      {/* Mobile Status */}
      <div
        className={`${activeView === "status"
            ? "flex"
            : "hidden"
          } md:hidden flex-1 h-full`}
      >
        <StatusViewer />
      </div>
    </Home>
  );
}

export default HomePage;