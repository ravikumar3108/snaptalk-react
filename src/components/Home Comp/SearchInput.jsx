import React, { useEffect, useState } from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import useConversation from "../Zustand/useConversation";
import Listings from "../validation/Listing";

function SearchInput() {
  const [search, setSearch] = useState("");
  const [conversationdata, setConversationData] = useState([]);
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const main = new Listings();
        const res = await main.getConversationList();
        setConversationData(res.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = search.trim()
    ? conversationdata.filter((conversation) =>
      conversation.fullname
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    : [];

  return (
    <div className="relative">
      {/* Search Box */}
      <div className="p-2 flex items-center gap-2 bg-[#111b21]">
        <div className="relative flex items-center bg-[#202c33] rounded-lg px-3 py-1.5 w-full">
          <MdSearch className="text-[#8696a0] text-xl mr-4" />

          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent text-[#d1d7db] text-sm outline-none w-full placeholder:text-[#8696a0]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <MdFilterList
          className="text-[#8696a0] text-xl cursor-pointer"
          title="Unread filter"
        />
      </div>

      {/* Search Results */}
      {search.trim() && (
        <div className="absolute top-full left-0 w-full bg-[#202c33] border-t border-gray-700 max-h-72 overflow-y-auto z-50">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  setSearch("");
                }}
                className="p-3 cursor-pointer hover:bg-[#2a3942] text-white border-b border-gray-700"
              >
                <div className="font-medium">
                  {conversation.fullname}
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-400" onClick={() => {
              setSearch("");
            }}>
              No user found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;