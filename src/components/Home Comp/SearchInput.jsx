import React, { useEffect, useState } from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import useConversation from "../Zustand/useConversation";
import toast, { Toaster } from "react-hot-toast";
import Listings from "../validation/Listing";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const [conversationdata, setConversation] = useState([]);

  useEffect(() => {
    const main = new Listings();
    main.getConversationList().then((res) => setConversation(res.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = conversationdata.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div className="p-2 flex items-center gap-2 bg-[#111b21]">
      <div className="relative flex items-center bg-[#202c33] rounded-lg px-3 py-1.5 w-full">
        <MdSearch className="text-[#8696a0] text-xl mr-4" />
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent text-[#d1d7db] text-sm outline-none w-full placeholder:text-[#8696a0]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <MdFilterList className="text-[#8696a0] text-xl cursor-pointer" title="Unread filter" />
    </div>
  );
}

export default SearchInput;