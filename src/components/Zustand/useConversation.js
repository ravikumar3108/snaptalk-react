// // import { create } from 'zustand'

// // const useConversation = create((set) => ({
// //     selectedConversation : null,
// //     setSelectedConversation : (selectedConversation)=> set({selectedConversation}),
// //     messages  : [],
// //     setMessages : (messages) => set({messages})
// // }))

// // export default useConversation;

// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),

//   messages: [],
//   setMessages: (messages) => set({ messages }),

//   activeView: "home",
//   setActiveView: (activeView) => set({ activeView }),
// }));

// export default useConversation;

import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,

  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  activeView: "chat",

  setActiveView: (activeView) => set({ activeView }),

  messages: [],

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => {
      const alreadyExists = state.messages.some(
        (msg) => msg._id === message._id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        messages: [...state.messages, message],
      };
    }),

  markMessagesRead: () =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        isRead: true,
      })),
    })),
}));

export default useConversation;
