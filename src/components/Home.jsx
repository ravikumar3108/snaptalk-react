import React from "react";
import SearchInput from "./Home Comp/SearchInput";
import Sidebar from "./Home Comp/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import Logoutbtn from "./Home Comp/Logoutbtn";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./validation/AuthUser";
import Listings from "./validation/Listing";

function Home({ children, protect }) {
  const { authUser, setAuthUser } = useAuthContext();

  const navigate = useNavigate();
  async function profile() {
    const main = new Listings();
    main
      .profile()
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setAuthUser(res.data.user);
        } else {
          setAuthUser(null);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("error in profile", err);
      });
  }

  useEffect(() => {
    if (protect) {
      profile();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-dark1 m-auto flex justify-center items-center">
      {/* <h1>Welcome to ChatApp</h1> */}
      <div
        style={{ width: "90%" }}
        className="bg-dark3 h-5/6 m-auto border flex rounded-lg overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}

export default Home;
