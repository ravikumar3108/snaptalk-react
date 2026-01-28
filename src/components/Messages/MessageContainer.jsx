import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../validation/AuthUser";
import UsersProfile from "./UsersProfile";
import { MdCall, MdVideocam, MdSearch, MdMoreVert } from "react-icons/md";

function MessageContainer() {
  const { selectedConversation } = useConversation();

  return (
    <div className="md:min-w-[450px] w-full flex flex-col h-full bg-[#0b141a]">
      {selectedConversation ? (
        <>
          {/* WhatsApp Style Header */}
          <div className="bg-[#202c33] py-2.5 px-4 flex justify-between items-center z-10 border-l border-[#313d45]">
            <UsersProfile />
            <div className="flex items-center gap-6 text-[#aebac1]">
              <MdVideocam className="text-xl cursor-pointer hover:text-white transition-colors" />
              <MdCall className="text-xl cursor-pointer hover:text-white transition-colors" />
              <div className="w-[1px] h-6 bg-[#3b4a54] mx-1"></div>
              <MdSearch className="text-xl cursor-pointer hover:text-white transition-colors" />
              <MdMoreVert className="text-xl cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Messages Area */}
          <MessageList />

          {/* Input Area */}
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#222e35] border-l border-[#313d45]">
      <div className="px-4 text-center flex flex-col items-center gap-4">
        <div className="w-64 h-64 mb-4 opacity-10">
          <TiMessages className="w-full h-full text-[#8696a0]" />
        </div>
        <h1 className="text-3xl font-light text-[#e9edef]">
          Welcome 👋 {authUser?.fullname || "User"}
        </h1>
        <p className="text-[#8696a0] text-sm max-w-md">
          Select a chat to start messaging. SnapTalk protects your privacy with end-to-end encryption.
        </p>
      </div>
    </div>
  );
};

export default MessageContainer;