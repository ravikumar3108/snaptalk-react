import React from "react";
import useConversation from "../Zustand/useConversation";
import girl from "../images/girl.jpg"
import boy from "../images/boy.jpg"

function UsersProfile() {
  const { selectedConversation } = useConversation();

  return (
    <>
        <div className={`flex items-center gap-2 rounded p-2 py-1 cursor-pointer`}>
          <div className="avatar online w-9">
            <div className="w-24 rounded-full">
              <img src={selectedConversation.gender == "female" ? girl : boy} alt="profilepic" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="gap-3 justify-between">
              <p className="font-bold text-black ">
                {selectedConversation.fullname.toString().toUpperCase()}
              </p>
            </div>
          </div>
        </div>
    </>
  );
}

export default UsersProfile;
