import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../validation/AuthUser";

function Logoutbtn() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()
  const { authUser, setAuthUser } = useAuthContext();

  function handleLogout() {
    setLoading(true);
    try {
      localStorage.removeItem("chat-user");
      localStorage.removeItem("token");
      setAuthUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      nav("/login")
    }
  }
  
  return (
    <div className="mt-auto">
     {!loading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout} />
     ) : 
     <span className="loading loading-spinner"></span>
    }
    </div>
  );
}

export default Logoutbtn;
