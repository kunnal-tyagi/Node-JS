import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const FetchUser = async () => {
    try {
      if (userData) return;

      const user = await axios.get(
        "http://localhost:3000/profile/view",
        { withCredentials: true }
      );

      dispatch(addUser(user.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
