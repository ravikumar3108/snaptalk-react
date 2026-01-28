import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import Listings from "../validation/Listing";
import useConversation from "../Zustand/useConversation";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "./useListenMessages";

function MessageList() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  
  // Custom hook to listen for new socket messages
  useListenMessages();
  
  const lastMessageRef = useRef();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Fetch chat history whenever selected conversation changes
  useEffect(() => {
    const chatMessages = async () => {
      if (!selectedConversation?._id) return;
      
      setLoading(true);
      try {
        const main = new Listings();
        const res = await main.getMessages(selectedConversation._id);
        if (res.data) {
          setMessages(res.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    chatMessages();
  }, [selectedConversation?._id, setMessages]); // Minimal dependencies to prevent loops

  return (
    <div className="px-4 flex-1 overflow-auto bg-[#0b141a] custom-scrollbar py-4">
      {/* Loading Skeletons */}
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Render Messages */}
      {!loading &&
        messages.length > 0 &&
        messages.map((item) => (
          <div key={item._id} ref={lastMessageRef}>
            <Message message={item} />
          </div>
        ))}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full opacity-50">
          <p className="bg-[#182229] text-[#8696a0] px-4 py-1 rounded-md text-sm">
            Send a message to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default MessageList;