import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useConversation from "../Zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import Listings from "../validation/Listing";

function MessageInput() {
  const [loading, setLoading] = useState(false);
  const [currentMsg , setCurrentMsg] = useState("")
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const main = new Listings();
      const response = main
        .sendMessages(selectedConversation._id, currentMsg)
        .then((res) => {
          const data = res.data;
          setMessages([...messages, data]);
          toast.success("sent");
          setCurrentMsg({message:""})
        });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            autoCapitalize="message"
            type="text"
            name="message"
            className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            onChange={(e) => {
              setCurrentMsg({[e.target.name]: e.target.value });
            }}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? <div className='loading loading-spinner'></div> : <IoSend className="text-white" />}
            
          </button>
        </div>
      </form>
    </>
  );
}

export default MessageInput;
