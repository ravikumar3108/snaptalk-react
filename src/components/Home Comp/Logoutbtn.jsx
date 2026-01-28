import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../validation/AuthUser";

function Logoutbtn() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setAuthUser } = useAuthContext();

  function handleLogout() {
    setLoading(true);
    localStorage.removeItem("chat-user");
    localStorage.removeItem("token");
    setAuthUser(null);
    nav("/login");
  }
  
  return (
    <button 
      onClick={handleLogout}
      className="bg-gradient-magic-button-custom flex items-center justify-center p-2 rounded-full hover:opacity-80 transition-all"
    >
      {!loading ? (
        <BiLogOut className="w-5 h-5 text-white" />
      ) : (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </button>
  );
}

export default Logoutbtn;