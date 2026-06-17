// import React from "react";
// import { useAuthContext } from "../validation/AuthUser";
// import { extractTime } from "../utils/extractTime";

// function Message({ message }) {
//   const { authUser } = useAuthContext();
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt);

//   return (
//     <div className={`flex w-full mb-1 ${fromMe ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`relative max-w-[65%] px-3 py-1.5 shadow-sm rounded-lg text-[14.2px] 
//         ${fromMe 
//           ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" 
//           : "bg-[#202c33] text-[#e9edef] rounded-tl-none"}
//         `}
//       >
//         <p className="leading-relaxed pr-10">{message.message}</p>
//         <div className="absolute bottom-1 right-2 flex items-center gap-1">
//           <span className="text-[10px] text-[#8696a0] uppercase">{formattedTime}</span>
//           {fromMe && (
//             <span className="text-[#53bdeb] text-xs">✓✓</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Message;

import React from "react";
import { useAuthContext } from "../validation/AuthUser";
import { extractTime } from "../utils/extractTime";
import { MdDone, MdDoneAll } from "react-icons/md";

function Message({ message }) {
  const { authUser } = useAuthContext();

  const fromMe =
    message.senderId === authUser._id;

  const formattedTime = extractTime(
    message.createdAt
  );

  return (
    <div
      className={`flex w-full mb-1 ${
        fromMe
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[75%] px-3 py-1.5 shadow-sm rounded-lg text-[14.2px]
        ${
          fromMe
            ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
            : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
        }
      `}
      >
        <p className="leading-relaxed pr-14 break-words">
          {message.message}
        </p>

        <div className="absolute bottom-1 right-2 flex items-center gap-1">
          <span className="text-[10px] text-[#8696a0]">
            {formattedTime}
          </span>

          {fromMe && (
            <>
              {message.isRead ? (
                <MdDoneAll
                  size={15}
                  className="text-[#53bdeb]"
                />
              ) : message.delivered ? (
                <MdDoneAll
                  size={15}
                  className="text-[#8696a0]"
                />
              ) : (
                <MdDone
                  size={15}
                  className="text-[#8696a0]"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;