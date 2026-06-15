import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../validation/AuthUser";
import UsersProfile from "./UsersProfile";
import { MdCall, MdVideocam, MdSearch, MdMoreVert, MdArrowBack } from "react-icons/md"; // MdArrowBack add kiya

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-full w-full bg-[#0b141a]">
      {selectedConversation ? (
        <>
          {/* Header Section */}
          <div className="bg-[#202c33] py-2.5 px-4 flex justify-between items-center z-10 border-l border-[#313d45]/50">
            <div className="flex items-center">

              {/* --- BACK BUTTON (Sirf Mobile par dikhega) --- */}
              <div
                className="md:hidden mr-3 text-[#aebac1] cursor-pointer hover:bg-[#3b4a54] p-1 rounded-full transition-all"
                onClick={() => setSelectedConversation(null)}
              >
                <MdArrowBack className="text-2xl" />
              </div>

              <UsersProfile />
            </div>

            {/* Actions Icons */}
            <div className="flex items-center gap-4 md:gap-6 text-[#aebac1]">
              <MdVideocam className="text-xl cursor-pointer hover:text-white transition-colors" />
              <MdCall className="text-xl cursor-pointer hover:text-white transition-colors" />
              <div className="hidden md:block w-[1px] h-6 bg-[#3b4a54] mx-1"></div>
              <MdSearch className="text-xl cursor-pointer hover:text-white transition-colors" />
              <MdMoreVert className="text-xl cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <MessageList />
          </div>

          {/* Input Area */}
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}

// NoChatSelected Component (No changes needed here, just ensure it handles authUser correctly)
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#222e35] border-l border-[#313d45]">
      <div className="px-4 text-center flex flex-col items-center gap-4">
        <TiMessages className="text-7xl text-[#8696a0] opacity-20" />
        <h1 className="text-3xl font-light text-[#e9edef]">Welcome 👋 {authUser?.fullname}</h1>
        <p className="text-[#8696a0] text-sm max-w-sm">
          Select a chat to start messaging. Send and receive messages without keeping your phone online.
        </p>
      </div>
    </div>
  );
};

export default MessageContainer;