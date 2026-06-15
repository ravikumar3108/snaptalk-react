// import React, { useState } from "react";
// // import { ArrowLeft } from "lucide-react";

// const Profile = () => {
//   const [name, setName] = useState("Ravi Kumar");
//   const [about, setAbout] = useState("Hey there! I am using WhatsApp");
//   const [avatar, setAvatar] = useState("https://i.pravatar.cc/200");

//   const [openModal, setOpenModal] = useState(false);
//   const [tempName, setTempName] = useState(name);

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatar(URL.createObjectURL(file));
//     }
//   };

//   const saveName = () => {
//     setName(tempName);
//     setOpenModal(false);
//   };

//   return (
//     <div className="h-screen bg-[#f0f2f5]">

//       {/* Header */}
//       <div className="bg-[#008069] text-white p-4 flex items-center gap-4">
//         {/* <ArrowLeft size={22} className="cursor-pointer" /> */}
//         <h2 className="text-lg font-medium">Profile</h2>
//       </div>

//       {/* Avatar */}
//       <div className="flex justify-center mt-8 relative">
//         <img src={avatar} className="w-36 h-36 rounded-full object-cover" alt="avatar" />

//         <label className="absolute bottom-1 right-[42%] bg-green-500 p-2 rounded-full cursor-pointer">
//           📷
//           <input type="file" hidden onChange={handleImage} />
//         </label>
//       </div>

//       {/* Name */}
//       <div className="bg-white mt-8 px-5 py-4">
//         <p className="text-xs text-green-600">Your name</p>

//         <div
//           onClick={() => setOpenModal(true)}
//           className="flex justify-between items-center mt-1 cursor-pointer"
//         >
//           <p>{name}</p>
//           ✏️
//         </div>
//       </div>

//       {/* About */}
//       <div className="bg-white mt-4 px-5 py-4">
//         <p className="text-xs text-green-600">About</p>
//         <p className="mt-1">{about}</p>
//       </div>

//       {/* Name Edit Modal */}
//       {openModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

//           <div className="bg-white w-[300px] rounded-lg p-4">

//             <h3 className="font-medium">Edit name</h3>

//             <input
//               value={tempName}
//               onChange={(e) => setTempName(e.target.value)}
//               className="border w-full mt-3 p-2 outline-green-500 rounded"
//             />

//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setOpenModal(false)}>Cancel</button>
//               <button
//                 onClick={saveName}
//                 className="text-green-600 font-medium"
//               >
//                 Save
//               </button>
//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default Profile;
import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useAuthContext } from "../validation/AuthUser";
import useConversation from "../Zustand/useConversation";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";

function Profile() {
  const { authUser } = useAuthContext();
  const { setActiveView } = useConversation();

  return (
    <div className="h-full bg-[#111b21] text-white">
      {/* Header */}
      <div className="bg-[#202c33] p-4 flex items-center gap-4">
        <MdArrowBack
          className="text-2xl cursor-pointer"
          onClick={() => setActiveView("chat")}
        />

        <h2 className="text-lg font-semibold">
          Profile
        </h2>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col items-center mt-10">
        <img
          src={authUser?.gender === "female" ? girl : boy}
          alt="profile"
          className="w-40 h-40 rounded-full object-cover"
        />

        <h2 className="mt-5 text-2xl font-semibold">
          {authUser?.fullname}
        </h2>

        <p className="text-gray-400 mt-2">
          {authUser?.email}
        </p>
      </div>
    </div>
  );
}

export default Profile;