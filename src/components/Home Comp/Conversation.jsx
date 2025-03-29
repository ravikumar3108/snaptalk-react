import React, { useEffect } from "react";
import useConversation from "../Zustand/useConversation";
import { useSocketContext } from "../validation/socketContext";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import { useSearchParams } from "react-router-dom";

function Conversation({ conversationdata, emoji, lastIndex }) {
  
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversationdata._id;
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(conversationdata._id);

  return (
    <>
      <div
        className={`flex items-center gap-2 hover:bg-sky-500 border-y-2 rounded p-2 py-1 cursor-pointer my-1
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => {
          setSelectedConversation(conversationdata);
        }}
      >
        <div className={`avatar w-1/5 ${isOnline ? "online" : ""}`}>
          <div className="w-24 rounded-full">
            <img
              src={`${conversationdata.gender == "female" ? girl : boy}`}
              alt="profilepic"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold">{conversationdata.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}

export default Conversation;
