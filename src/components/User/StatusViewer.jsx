import React from "react";
import { MdArrowBack } from "react-icons/md";
import useConversation from "../Zustand/useConversation";

function StatusViewer() {
  const { setActiveView } = useConversation();

  return (
    <div className="w-full h-full bg-[#111b21] flex flex-col">
      <div className="h-16 bg-[#202c33] flex items-center gap-4 px-4">
        <MdArrowBack
          onClick={() => setActiveView("home")}
          className="text-white text-2xl cursor-pointer"
        />

        <h2 className="text-white text-lg">
          Status
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Status Section
        </h1>
      </div>
    </div>
  );
}

export default StatusViewer;