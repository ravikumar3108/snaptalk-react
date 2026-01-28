import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./validation/AuthUser";
import Listings from "./validation/Listing";

function Home({ children, protect }) {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  async function profile() {
    const main = new Listings();
    main
      .profile()
      .then((res) => {
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
    /* Background Layer: WhatsApp Dark Theme */
    <div className="w-full h-screen bg-[#0c1317] flex justify-center items-center relative overflow-hidden">
      {/* Top Green Accent Bar (Desktop only) */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-[#00a884] hidden md:block"></div>

      {/* Main Chat Container */}
      <div
        className="z-10 bg-[#222e35] 
                   w-full h-full 
                   md:w-[95%] md:h-[95%] lg:max-w-[1600px] 
                   flex shadow-2xl overflow-hidden md:rounded-sm border border-[#313d45]/50"
      >
        {children}
      </div>
    </div>
  );
}

export default Home;
