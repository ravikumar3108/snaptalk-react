import React from "react";
import useConversation from "../Zustand/useConversation";
import { useSocketContext } from "../validation/socketContext";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";

function Conversation({ conversationdata, lastIndex }) {
  const {
    selectedConversation,
    setSelectedConversation,
    setActiveView, // <-- add this
  } = useConversation();

  const isSelected = selectedConversation?._id === conversationdata._id;

  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(conversationdata._id);

  const handleConversationClick = () => {
    setSelectedConversation(conversationdata);
    setActiveView("chat"); // <-- profile se chat par wapas
  };

  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-all
      ${isSelected ? "bg-[#2a3942]" : "hover:bg-[#202c33]"}`}
      onClick={handleConversationClick}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={conversationdata.gender === "female" ? girl : boy}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>

        {isOnline && (
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#00a884] border-2 border-[#111b21] rounded-full"></div>
        )}
      </div>

      {/* Info */}
      <div
        className={`flex flex-col flex-1 border-b border-[#222e35] pb-3 ${
          lastIndex ? "border-none" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="text-[#e9edef] text-base font-normal truncate">
            {conversationdata.fullname}
          </p>

          <span className="text-[11px] text-[#8696a0]">
            12:45 PM
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-[#8696a0] truncate w-60">
            Click to start chatting...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;