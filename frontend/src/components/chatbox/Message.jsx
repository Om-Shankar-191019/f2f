import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { defaultAvatar, extractTime } from "../../utils/constants";

const Message = ({ messageItem }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useSelector((state) => state.chat);

  const itsMe = messageItem.senderId === authUser._id;
  const cornerMessageClass = itsMe ? "chat-end" : "chat-start";
  const profilePic = itsMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const formatTime = extractTime(messageItem.createdAt);
  const shakeClass = messageItem.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${cornerMessageClass} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic ? profilePic : defaultAvatar}
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          itsMe ? "bg-themeColor text-white" : "bg-white text-gray-600"
        } ${shakeClass} pb-2`}
      >
        {messageItem.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatTime}
      </div>
    </div>
  );
};

export default Message;
