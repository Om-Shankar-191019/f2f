import React from "react";
import MessageList from "./MessageList";
import ChatboxHeader from "./ChatboxHeader";
import { useSelector } from "react-redux";
import WelcomeChatbox from "./WelcomeChatbox";
import MessageInput from "./MessageInput";

const Chatbox = () => {
  const { selectedConversation } = useSelector((state) => state.chat);

  return (
    <>
      {selectedConversation ? (
        <div className="h-screen w-full  flex sm:flex-1 flex-col justify-between">
          <ChatboxHeader
            profilePic={selectedConversation.profilePic}
            fullName={selectedConversation.fullName}
            userId={selectedConversation._id}
          />
          <MessageList />
          <MessageInput />
        </div>
      ) : (
        <WelcomeChatbox />
      )}
    </>
  );
};

export default Chatbox;
