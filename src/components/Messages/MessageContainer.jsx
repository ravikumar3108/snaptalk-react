import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../validation/AuthUser";
import UsersProfile from "./UsersProfile";
import { MdSearch, MdMoreVert, MdCall, MdVideocam } from "react-icons/md";

function MessageContainer() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-full w-full bg-[#0b141a] relative">
      {selectedConversation ? (
        <>
          {/* WhatsApp Chat Header */}
          <div className="bg-[#202c33] py-2.5 px-4 flex justify-between items-center z-10">
            <UsersProfile />
            <div className="flex items-center gap-6 text-[#aebac1]">
              <MdVideocam className="text-xl cursor-pointer hover:text-white" />
              <MdCall className="text-xl cursor-pointer hover:text-white" />
              <div className="w-[1px] h-6 bg-[#3b4a54] mx-1"></div>
              <MdSearch className="text-xl cursor-pointer hover:text-white" />
              <MdMoreVert className="text-xl cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Chat Background Doodle effect (using a CSS pattern or simple dark bg) */}
          <div className="flex-1 overflow-hidden relative bg-[#0b141a] bg-opacity-95">
            <MessageList />
          </div>

          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext(); // Yahan use ho raha hai
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#222e35]">
      <div className="px-4 text-center flex flex-col items-center gap-4">
        <h1 className="text-3xl font-light text-[#e9edef]">
          Welcome 👋 {authUser?.fullname}
        </h1>
        <p className="text-[#8696a0] text-sm">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};
export default MessageContainer;
