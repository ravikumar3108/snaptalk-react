import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, Navigate } from "react-router-dom"; // Navigate import kiya
import HomePage from "./components/HomePage";
import { useAuthContext } from "./components/validation/AuthUser"; // Path check kar lein

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* 1. Home Page: Agar login hai toh HomePage, warna redirect to Login */}
      <Route
        path="/"
        element={authUser ? <HomePage /> : <Navigate to="/login" />}
      />

      {/* 2. Login Page: Agar login hai toh seedha Home bhej do (taki baar baar login na dikhe) */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />

      {/* 3. Signup Page: Same logic as Login */}
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />

      {/* 4. Messages: Isko alag se access karne ki zaroorat nahi honi chahiye agar HomePage mein hai, 
          lekin agar rakha hai toh ise bhi protect karein */}
      <Route
        path="/messages"
        element={authUser ? <HomePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
