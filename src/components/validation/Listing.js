import { Component } from "react";
import Api from "./Api";

class Listings extends Component {
  async profile() {
    return Api.get(`/api/auth/profile`);
  }

  async getConversationList() {
    return Api.get("/api/users");
  }

  async sendMessages(id, data) {
    let receiverId = id;
    // FIX: String ko object mein wrap karke bhejna zaroori hai
    return Api.post(`/api/messages/send/${receiverId}`, { message: data });
  }

  async getMessages(id) {
    // Note: Get messages ke liye aksar GET use hota hai, par agar aapka backend POST mang raha hai toh thik hai
    return Api.get(`/api/messages/${id}`); 
  }

  render() {
    return <></>;
  }
}

export default Listings;