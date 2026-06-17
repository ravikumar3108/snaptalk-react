import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthUser";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let newSocket; // Local variable for the socket instance

    // let localpath = "http://localhost:8000";
    let livepath = "https://snaptalk-back.vercel.app";

    if (authUser) {
      newSocket = io(livepath, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      // Cleanup: Jab component unmount hoga ya authUser change hoga
      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      // Agar authUser nahi hai, toh purane socket ko band karo
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};

// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthUser";
// import { io } from "socket.io-client";

// export const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUser, setOnlineUser] = useState([]);
//   const { authUser } = useAuthContext();
//   useEffect(() => {
//     if (authUser) {
//       const socket = io("https://snaptalk-back.vercel.app", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       setSocket(socket);
//       // socket.on is used to listen to the events can be used both client and server side
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUser(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUser }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
