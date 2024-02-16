import React from "react";
import { defaultAvatar } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationReducer } from "../../redux/slices/chatSlice";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ user, lastIndex }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.chat);
  const { profilePic, fullName, username, _id } = user;
  const currentUserFlag = selectedConversation?._id === _id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);

  return (
    <>
      <div
        onClick={() => dispatch(setSelectedConversationReducer(user))}
        className={`flex gap-2 items-center hover:bg-themeColor rounded hover:text-white ${
          currentUserFlag && "bg-themeColor text-white"
        } px-2 py-2 cursor-pointer	`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img
              src={profilePic ? profilePic : defaultAvatar}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div>
              <p className="font-semibold text-sm ">{fullName}</p>
              <p className="text-[10px] text-themeColorHover ">{username}</p>
            </div>
            {/* <span className="text-xs ">12:34 am</span> */}
          </div>
        </div>
      </div>

      {/* {!lastIdx && <div className="divider my-0 py-0 h-1" />} */}
    </>
  );
};

export default Conversation;
