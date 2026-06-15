import { Component } from "react";
import Api from "./Api";

class Listings extends Component {
  async loginUser(loginData) {
    return Api.post("/api/auth/login", loginData);
  }

  async signupUser(data) {
    return Api.post(`/api/auth/signup`, data);
  }

  async profile() {
    return Api.get(`/api/auth/profile`);
  }

  async getConversationList(data) {
    return Api.get("/api/users");
  }

  // async sendMessages(id, data) {
  //   let receiverId = id;
  //   let message = data;
  //   return Api.post(`/api/messages/send/${receiverId}`, message);
  // }

  async sendMessages(id, data) {
    let receiverId = id;
    // Galti: message sirf string bhej raha tha
    // Fix: Data ko object mein bhejien
    return Api.post(`/api/messages/send/${receiverId}`, { message: data });
  }

  async getMessages(id) {
    let receiverId = id;
    return Api.post(`/api/messages/${receiverId}`);
  }

  render() {
    return <></>;
  }
}

export default Listings;
