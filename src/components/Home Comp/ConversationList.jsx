import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import Listings from "../validation/Listing";
import { getRandomEmoji } from "../utils/emoji";

function ConversationList() {
  const [conversationdata, setConversation] = useState([]);
  
  async function getConversatiion() {
    const main = new Listings();
    const messages = main.getConversationList();
    messages.then((res) => setConversation(res.data));
  }

  useEffect(() => { getConversatiion(); }, []);

  return (
    <div className="flex flex-col overflow-y-auto h-full custom-scrollbar">
      {conversationdata.map((conversation, i) => (
        <Conversation
          key={conversation._id}
          conversationdata={conversation}
          emoji={getRandomEmoji()}
          lastIndex={i === conversationdata.length - 1}
        />
      ))}
    </div>
  );
}

export default ConversationList;