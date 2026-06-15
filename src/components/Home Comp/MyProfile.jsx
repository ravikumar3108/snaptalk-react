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

import React from "react";
import { useAuthContext } from "../validation/AuthUser";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import {
  MdDonutLarge,
  MdChat,
  MdMoreVert,
} from "react-icons/md";
import useConversation from "../Zustand/useConversation";

function MyProfile() {
  const { authUser } = useAuthContext();
  const { setActiveView } = useConversation();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-[#202c33]">
      {/* Profile Photo */}
      <div
        onClick={() => setActiveView("profile")}
        className="cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-all">
          <img
            src={authUser?.gender === "female" ? girl : boy}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5 text-[#aebac1]">
        <MdDonutLarge
          className="text-xl cursor-pointer hover:text-white"
          title="Status"
        />

        <MdChat
          className="text-xl cursor-pointer hover:text-white"
          title="New Chat"
        />

        <MdMoreVert
          className="text-xl cursor-pointer hover:text-white"
          title="Menu"
        />
      </div>
    </div>
  );
}

export default MyProfile;
