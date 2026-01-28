import React from "react";
import { useAuthContext } from "../validation/AuthUser";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import { MdDonutLarge, MdChat, MdMoreVert } from "react-icons/md";

function MyProfile() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-[#202c33]">
      {/* Profile Photo */}
      <div className="avatar">
        <div className="w-10 rounded-full cursor-pointer hover:opacity-80 transition-all">
          <img src={authUser?.gender === "female" ? girl : boy} alt="profile" />
        </div>
      </div>

      {/* WhatsApp Header Icons Style */}
      <div className="flex items-center gap-5 text-[#aebac1]">
        <MdDonutLarge className="text-xl cursor-pointer hover:text-white" title="Status" />
        <MdChat className="text-xl cursor-pointer hover:text-white" title="New Chat" />
        <MdMoreVert className="text-xl cursor-pointer hover:text-white" title="Menu" />
      </div>
    </div>
  );
}

export default MyProfile;