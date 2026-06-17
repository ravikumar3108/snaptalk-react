// import React from "react";
// import { useAuthContext } from "../validation/AuthUser";
// import girl from "../images/girl.jpg";
// import boy from "../images/boy.jpg";
// import { MdDonutLarge, MdChat, MdMoreVert } from "react-icons/md";
// import { Link } from "react-router-dom";

// function MyProfile() {
//   const { authUser } = useAuthContext();
//   return (
//     <div className="flex items-center justify-between w-full px-4 py-2 bg-[#202c33]">
//       {/* Profile Photo */}
//       <Link to={"/userprofile"}>
//         <div className="avatar">
//           <div className="w-10 rounded-full cursor-pointer hover:opacity-80 transition-all">
//             <img
//               src={authUser?.gender === "female" ? girl : boy}
//               alt="profile"
//             />
//           </div>
//         </div>
//       </Link>

//       {/* WhatsApp Header Icons Style */}
//       <div className="flex items-center gap-5 text-[#aebac1]">
//         <MdDonutLarge
//           className="text-xl cursor-pointer hover:text-white"
//           title="Status"
//         />
//         <MdChat
//           className="text-xl cursor-pointer hover:text-white"
//           title="New Chat"
//         />
//         <MdMoreVert
//           className="text-xl cursor-pointer hover:text-white"
//           title="Menu"
//         />
//       </div>
//     </div>
//   );
// }

// export default MyProfile;
import React, { useEffect, useRef, useState } from "react";
import {
  MdDonutLarge,
  MdChat,
  MdMoreVert,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { useAuthContext } from "../validation/AuthUser";
import useConversation from "../Zustand/useConversation";

import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import Logoutbtn from "./Logoutbtn";

function MyProfile() {
  const { authUser } = useAuthContext();

  const {
    setActiveView,
    setSelectedConversation,
  } = useConversation();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

 

  const openProfile = () => {
    setSelectedConversation(null);
    setActiveView("profile");
  };

  const openStatus = () => {
    setSelectedConversation(null);
    setActiveView("status");
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
  }, []);

  return (
    <div className="relative flex items-center justify-between w-full p-2">
      {/* Profile */}
      <img
        src={authUser?.gender === "female" ? girl : boy}
        alt=""
        onClick={openProfile}
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />

      {/* Actions */}
      <div className="flex items-center gap-5 text-[#aebac1]">
        <MdDonutLarge
          onClick={openStatus}
          className="text-xl cursor-pointer hover:text-white"
        />

        <MdChat
          className="text-xl cursor-pointer hover:text-white"
        />

        <div ref={menuRef} className="relative">
          <MdMoreVert
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="text-xl cursor-pointer hover:text-white"
          />

          {showMenu && (
            <div className="absolute top-8 right-0 w-52 bg-[#233138] rounded-md overflow-hidden shadow-xl z-50">
              <button className="w-full text-left px-4 py-3 text-white hover:bg-[#2a3942] flex items-center gap-3">
                <MdSettings />
                Settings
              </button>

              <div className="border-t border-[#2a3942]" />

              <div className="px-4 py-3 hover:bg-[#2a3942]">
                <div className="flex items-center gap-3 text-red-400">
                  <MdLogout />
                  <Logoutbtn />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;