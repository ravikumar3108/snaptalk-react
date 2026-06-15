import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const [name, setName] = useState("Ravi Kumar");
  const [about, setAbout] = useState("Hey there! I am using WhatsApp");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/200");

  const [openModal, setOpenModal] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const saveName = () => {
    setName(tempName);
    setOpenModal(false);
  };

  return (
    <div className="h-screen bg-[#f0f2f5]">

      {/* Header */}
      <div className="bg-[#008069] text-white p-4 flex items-center gap-4">
        {/* <ArrowLeft size={22} className="cursor-pointer" /> */}
        <h2 className="text-lg font-medium">Profile</h2>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mt-8 relative">
        <img src={avatar} className="w-36 h-36 rounded-full object-cover" />

        <label className="absolute bottom-1 right-[42%] bg-green-500 p-2 rounded-full cursor-pointer">
          📷
          <input type="file" hidden onChange={handleImage} />
        </label>
      </div>

      {/* Name */}
      <div className="bg-white mt-8 px-5 py-4">
        <p className="text-xs text-green-600">Your name</p>

        <div
          onClick={() => setOpenModal(true)}
          className="flex justify-between items-center mt-1 cursor-pointer"
        >
          <p>{name}</p>
          ✏️
        </div>
      </div>

      {/* About */}
      <div className="bg-white mt-4 px-5 py-4">
        <p className="text-xs text-green-600">About</p>
        <p className="mt-1">{about}</p>
      </div>

      {/* Name Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white w-[300px] rounded-lg p-4">

            <h3 className="font-medium">Edit name</h3>

            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border w-full mt-3 p-2 outline-green-500 rounded"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setOpenModal(false)}>Cancel</button>
              <button
                onClick={saveName}
                className="text-green-600 font-medium"
              >
                Save
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Profile;
