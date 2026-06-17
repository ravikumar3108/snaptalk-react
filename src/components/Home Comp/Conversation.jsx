import React from "react";
import useConversation from "../Zustand/useConversation";
import { useSocketContext } from "../validation/socketContext";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import { formatTime } from "../utils/formatTime";

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
    setActiveView("chat");
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
        className={`flex flex-col flex-1 border-b border-[#222e35] pb-3 ${lastIndex ? "border-none" : ""
          }`}
      >
        <div className="flex justify-between items-center">
          <p className="text-[#e9edef] text-base font-normal truncate">
            {conversationdata.fullname}
          </p>

          <span className="text-[11px] text-[#8696a0]">
            {formatTime(
              conversationdata.lastMessageTime
            )}
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-[#8696a0] truncate w-60">
            {conversationdata.lastMessage ||
              "Start conversation"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {conversationdata.unreadCount > 0 && (
            <span className="bg-[#00a884] text-white text-[10px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
              {conversationdata.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversation;