import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";
import Listings from "../validation/Listing";
import useConversation from "../Zustand/useConversation";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "./useListenMessages";

function MessageList() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useListenMessages();
  const lastMessageRef = useRef();
  // useref is used to redirect auto to the last messages of our chat

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const chatMessages = async () => {
    const main = new Listings();
    const response = await main
      .getMessages(selectedConversation._id)
      .then((res) => {
        setMessages(res.data);
      });
  };

  useEffect(() => {
    chatMessages();
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((item) => {
          return (
            <>
              <div key={item._id} ref={lastMessageRef}>
                <Message message={item} />
              </div>
            </>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default MessageList;
