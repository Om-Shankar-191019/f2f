import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSelectedConversationReducer } from "../../redux/slices/chatSlice";
import { defaultAvatar } from "../../utils/constants";
import { useSocketContext } from "../../context/SocketContext";

const ChatboxHeader = ({ fullName, profilePic, userId }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(userId);

  return (
    <div
      className={`flex gap-2 items-center    px-2 py-2 cursor-pointer bg-themeColor sm:bg-white	`}
    >
      <IoIosArrowBack
        onClick={() => dispatch(setSelectedConversationReducer(null))}
        className="flex sm:hidden text-2xl text-white sm:text-black"
      />
      <div className={`avatar `}>
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
            <p className="font-semibold text-sm text-white sm:text-black">
              {fullName}
            </p>
            {isOnline && (
              <p className="text-[10px] text-themeColorHover ">online</p>
            )}
          </div>
          {/* <span className="text-xs ">options</span> */}
        </div>
      </div>
    </div>
  );
};

export default ChatboxHeader;
