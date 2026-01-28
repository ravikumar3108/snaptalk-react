import React from "react";
import useConversation from "../Zustand/useConversation";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";

function UsersProfile() {
  const { selectedConversation } = useConversation();
  if (!selectedConversation) return null;

  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={selectedConversation.gender === "female" ? girl : boy} alt="profile" />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[#e9edef] text-base font-medium leading-tight">
          {selectedConversation.fullname}
        </p>
        <p className="text-[12px] text-[#8696a0]">Online</p>
      </div>
    </div>
  );
}

export default UsersProfile;