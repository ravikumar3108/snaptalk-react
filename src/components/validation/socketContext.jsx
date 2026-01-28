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
    if (authUser) {
      // variable ka naam 'newSocket' rakha hai taaki state wale 'socket' se clash na ho
      const newSocket = io("https://snaptalk-back.vercel.app", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Listen for online users
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      // Cleanup function
      return () => {
        newSocket.close();
        setSocket(null); // Socket ko clear karna zaroori hai
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // Dependency mein socket ko mat daalna varna loop ban jayega
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
