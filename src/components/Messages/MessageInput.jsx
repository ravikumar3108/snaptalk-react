import React, { useState } from "react";
import { MdSend, MdMood, MdAdd } from "react-icons/md";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import Listings from "../validation/Listing";

function MessageInput() {
  const [loading, setLoading] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(""); // Default value string honi chahiye
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Khali message send karne se rokna
    if (!currentMsg.trim()) return;

    setLoading(true);
    try {
      const main = new Listings();
      
      // 2. Selected conversation ki ID aur message string bhejna
      // Dhyaan dein: currentMsg ab ek simple string hai
      const res = await main.sendMessages(selectedConversation._id, currentMsg);
      
      if (res.data) {
        // 3. UI update: Purane messages + naya message
        setMessages([...messages, res.data]);
        
        // 4. Input field ko khali karna
        setCurrentMsg(""); 
        // toast.success("Message sent"); // Optional: WhatsApp mein toast nahi hota
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* WhatsApp Bottom Input Bar Style */
    <div className="bg-[#202c33] px-4 py-2 flex items-center gap-4 border-t border-[#313d45]/50">
      
      {/* Emoji and Attachment Icons */}
      <div className="flex items-center gap-4 text-[#aebac1]">
        <MdMood className="text-2xl cursor-pointer hover:text-white transition-colors" />
        <MdAdd className="text-2xl cursor-pointer hover:text-white transition-colors" />
      </div>

      {/* Message Form */}
      <form className="flex-1" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="w-full bg-[#2a3942] border-none text-[#d1d7db] text-sm rounded-lg py-2.5 px-4 outline-none placeholder-[#8696a0]"
            placeholder="Type a message"
            value={currentMsg} // Binding value to state
            onChange={(e) => setCurrentMsg(e.target.value)} // Direct string update
          />
        </div>
      </form>

      {/* Send Button */}
      <button 
        type="button" 
        onClick={handleSubmit}
        disabled={loading || !currentMsg.trim()}
        className="flex items-center justify-center p-1"
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs text-[#aebac1]"></span>
        ) : (
          <MdSend 
            className={`text-2xl transition-all ${
              currentMsg.trim() ? "text-[#00a884] scale-110" : "text-[#aebac1]"
            }`} 
          />
        )}
      </button>
    </div>
  );
}

export default MessageInput;