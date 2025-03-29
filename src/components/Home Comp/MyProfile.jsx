import React from "react";
import { useAuthContext } from "../validation/AuthUser";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import Logoutbtn from "./Logoutbtn";

function MyProfile() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="flex p-2 justify-between">
        <h1 className="text-2xl font-bold text-blue-500">SnapTalk</h1>
        <Logoutbtn/>
        {/* <div
          className={`flex items-center gap-2 rounded p-2 py-1 cursor-pointer justify-end`}
        >
          <div className="avatar online w-1/5">
            <div className="w-24 rounded-full">
              <img
                src={authUser.gender == "female" ? girl : boy}
                alt="profilepic"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="gap-3 justify-between">
              <p className="font-bold text-black ">
                {authUser.fullname.charAt(0).toUpperCase() +
                  authUser.fullname.slice(1)}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default MyProfile;
