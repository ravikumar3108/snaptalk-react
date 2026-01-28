import React, { useState } from "react";
import { MdSend, MdMood, MdAdd } from "react-icons/md";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import Listings from "../validation/Listing";

function MessageInput() {
  const [loading, setLoading] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentMsg.trim()) return;
    setLoading(true);
    try {
      const main = new Listings();
      const res = await main.sendMessages(selectedConversation._id, currentMsg);
      setMessages([...messages, res.data]);
      setCurrentMsg("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#202c33] px-4 py-2 flex items-center gap-4">
      <div className="flex items-center gap-4 text-[#aebac1]">
        <MdMood className="text-2xl cursor-pointer hover:text-white" />
        <MdAdd className="text-2xl cursor-pointer hover:text-white" />
      </div>

      <form className="flex-1" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full bg-[#2a3942] border-none text-[#d1d7db] text-sm rounded-lg py-2.5 px-4 outline-none placeholder-[#8696a0]"
          placeholder="Type a message"
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
      </form>

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="text-[#aebac1] hover:text-white transition-all p-1"
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <MdSend className={`text-2xl ${currentMsg ? "text-[#00a884]" : "text-[#aebac1]"}`} />
        )}
      </button>
    </div>
  );
}

export default MessageInput;