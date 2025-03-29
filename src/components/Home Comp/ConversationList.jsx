import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import Listings from "../validation/Listing";
import { getRandomEmoji } from "../utils/emoji";
import { Link } from "react-router-dom";

function ConversationList() {
  const [conversationdata, setConversation] = useState([]);
  console.log(conversationdata);
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

  return (
    <div className="flex flex-col overflow-auto p-2 mt-2 text-white">
      {conversationdata.map((conversation, i) => {
        return (
          <>
            <Link
             to={`/messages?id=/${conversation._id}`} 
            >
              <Conversation
                key={conversation._id}
                conversationdata={conversation}
                emoji={getRandomEmoji()}
                lastIndex={i === conversationdata.length - 1}
              />
            </Link>
          </>
        );
      })}
    </div>
  );
}

export default ConversationList;
