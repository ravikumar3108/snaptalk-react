import React, { useState } from "react";
import { MdArrowBack, MdEdit } from "react-icons/md";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../validation/AuthUser";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";

function Profile() {
  const { authUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const [fullname, setFullname] = useState(
    authUser?.fullname || ""
  );

  const [username, setUsername] = useState(
    authUser?.username || ""
  );

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullname,
            username,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem(
        "chat-user",
        JSON.stringify(data)
      );

      setIsEditing(false);

      alert("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };


  const {
    setActiveView,
    setSelectedConversation,
  } = useConversation();

  const profileImage =
    authUser?.profilePic ||
    (authUser?.gender === "female" ? girl : boy);

  const handleBack = () => {
    setSelectedConversation(null);
    setActiveView("home");
  };

  return (
    <div className="w-full h-full bg-[#111b21] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-[#202c33] flex items-center gap-5 px-4 border-b border-[#2a3942]">
        <MdArrowBack
          onClick={handleBack}
          className="text-2xl text-[#d1d7db] cursor-pointer md:hidden"
        />

        <h2 className="text-white text-lg font-medium">
          Profile
        </h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Profile Image */}
        <div className="flex flex-col items-center py-8 md:py-10">
          <div className="relative">
            <img
              src={profileImage}
              alt="profile"
              className="w-36 h-36 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#202c33]"
            />

            <button className="absolute bottom-2 right-2 bg-[#00a884] p-2 rounded-full text-white shadow-lg">
              <MdEdit size={18} />
            </button>
          </div>

          <h2 className="mt-5 text-xl md:text-2xl font-semibold text-white text-center">
            <p>{authUser?.fullname}</p>
          </h2>

          <p className="text-[#8696a0] mt-1">
            @{authUser?.username}
          </p>
        </div>

        {/* Information Cards */}
        <div className="px-3 md:px-6 pb-6 space-y-3">
          {/* Name */}
          <div className="bg-[#202c33] rounded-xl p-4">
            <p className="text-[#00a884] text-sm mb-2">
              Full Name
            </p>

            <div className="flex justify-between items-center">
              {isEditing ? (
                <input
                  value={fullname}
                  onChange={(e) =>
                    setFullname(e.target.value)
                  }
                  className="bg-[#111b21] text-white px-2 py-1 rounded"
                />
              ) : (
                <p className="text-white">
                  {fullname}
                </p>
              )}

              <MdEdit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer text-[#8696a0]"
              />
            </div>
          </div>

          {/* Username */}
          <div className="bg-[#202c33] rounded-xl p-4">
            <p className="text-[#00a884] text-sm mb-2">
              Username
            </p>

            <div className="flex justify-between items-center">
              {isEditing ? (
                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="bg-[#111b21] text-white px-2 py-1 rounded"
                />
              ) : (
                <p className="text-white">
                  @{username}
                </p>
              )}

              <MdEdit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer text-[#8696a0]"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="bg-[#202c33] rounded-xl p-4">
            <p className="text-[#00a884] text-sm mb-2">
              Gender
            </p>

            <p className="text-white text-base md:text-lg capitalize">
              {authUser?.gender}
            </p>
          </div>

          {/* About Section */}
          <div className="bg-[#202c33] rounded-xl p-4">
            <p className="text-[#00a884] text-sm mb-2">
              About
            </p>

            <p className="text-[#d1d7db] text-sm leading-6">
              This information is visible to your contacts.
            </p>
          </div>

          {isEditing && (
            <div className="px-6">
              <button
                onClick={handleUpdate}
                className="w-full bg-[#00a884] text-white py-3 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;