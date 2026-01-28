import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};


// import { Component } from "react";
// import Api from "./Api";

// class Listings extends Component {
//   async profile() {
//     return Api.get(`/api/auth/profile`);
//   }

//   async getConversationList(data) {
//     return Api.get("/api/users");
//   }

//   async sendMessages(id, data) {
//     let receiverId = id
//     let message = data
//     return Api.post(`/api/messages/send/${receiverId}`, message);
//   }

//   async getMessages(id) {
//     let receiverId = id
//     return Api.post(`/api/messages/${receiverId}`);
//   }

//   render() {
//     return <></>;
//   }
// }

// export default Listings;
