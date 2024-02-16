import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import Logo from "../Logo";

const WelcomeChatbox = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center h-screen w-full  sm:flex sm:flex-1 bg-gray-200 ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} </p>
        <p>Select a chat to start messaging</p>

        <Logo tailwindClasses={"text-gray-400 text-5xl"} />
      </div>
    </div>
  );
};

export default WelcomeChatbox;
