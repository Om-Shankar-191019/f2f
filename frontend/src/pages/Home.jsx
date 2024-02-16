import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Chatbox from "../components/chatbox/Chatbox";
import Options from "../components/options/Options";
import { useSelector } from "react-redux";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { selectedConversation } = useSelector((state) => state.chat);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Change breakpoint as needed
    };

    // Initial call to handleResize
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col sm:flex-row h-screen  ">
      {/* <Options /> */}
      {isMobile && selectedConversation ? <Chatbox /> : <Sidebar />}
      {!isMobile && <Chatbox />}
    </div>
  );
};

export default Home;
