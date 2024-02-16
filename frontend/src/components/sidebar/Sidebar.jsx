import React from "react";
import SearchConversation from "./SearchConversation";
import ConversationList from "./ConversationList";
import Logout from "../options/Logout";

const Sidebar = () => {
  return (
    <div className="h-screen w-full sm:w-64 md:w-80 lg:w-96 border-r border-slate-500 px-1 flex flex-col overflow-auto">
      <div className="flex justify-between items-center bg-themeColor sm:bg-white text-white sm:text-black">
        <h2 className=" py-2 px-2 font-semibold text-lg ">Chats</h2>
        <Logout />
      </div>
      <SearchConversation />
      <ConversationList />
    </div>
  );
};

export default Sidebar;
