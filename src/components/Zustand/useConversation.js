// import { create } from 'zustand'

// const useConversation = create((set) => ({
//     selectedConversation : null,
//     setSelectedConversation : (selectedConversation)=> set({selectedConversation}),
//     messages  : [],
//     setMessages : (messages) => set({messages}) 
// }))

// export default useConversation;

import { create } from "zustand";

const useConversation = create((set) => ({
  // Chat
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  // Messages
  messages: [],
  setMessages: (messages) => set({ messages }),

  // View Management
  activeView: "chat",
  setActiveView: (activeView) => set({ activeView }),
}));

export default useConversation;