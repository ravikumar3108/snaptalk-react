import React, { useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../validation/AuthUser";
import UsersProfile from "./UsersProfile";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // useEffect(() => {
  //   // cleanup function (unmounted)
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  return (
    <>
      <div className="md:min-w-[450px] w-full flex flex-col msg-cont h-[100vh]">
        {selectedConversation ? (
          <>
            <div className="bg-slate-500 py-2 mb-2 flex justify-between px-4 sticky top-0 left-0 z-99">
              <div className="flex">
                <Link to={"/"}>
                  <TiArrowBackOutline className="text-2xl text-white mt-2" />
                </Link>
                <UsersProfile />
              </div>
              <div className="flex">
                <FaVideo className="text-2xl text-white mt-2 mr-4" />
                <IoCall className="text-2xl text-white mt-2" />
              </div>
            </div>
            <MessageList />
            <MessageInput />
          </>
        ) : (
          <>
            {/* Header */}
            <NoChatSelected />
          </>
        )}
      </div>
    </>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-white font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser && authUser.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
