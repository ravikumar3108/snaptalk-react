import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../Zustand/useConversation";
import toast, { Toaster } from "react-hot-toast";
import Listings from "../validation/Listing";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const [conversationdata, setConversation] = useState([]);
  async function getConversatiion() {
    const main = new Listings();
    const messages = main.getConversationList();
    messages.then((res) => {
      setConversation(res.data);
    });
  }

  useEffect(() => {
    getConversatiion();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversationdata.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  }

  return (
    <>
      <Toaster />

      <form className="p-2 flex items-center gap-2 w-full" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search…"
          className="p-1 input-bordered rounded-lg text-black w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit" className="p-2 rounded-lg bg-sky-500 text-white">
          <FaSearch />
        </button>
      </form>
    </>
  );
}

export default SearchInput;
