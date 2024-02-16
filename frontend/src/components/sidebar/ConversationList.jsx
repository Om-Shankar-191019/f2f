import React from "react";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import Conversation from "./Conversation";
import { useSelector } from "react-redux";
import ConversationSkeleton from "../skeletons/ConversationSkeleton";

const ConversationList = () => {
  const { loading } = useGetAllUsers();
  const { conversations } = useSelector((state) => state.chat);

  return (
    <>
      {!loading &&
        conversations.length > 0 &&
        conversations.map((user, index) => (
          <Conversation key={user._id} user={user} />
        ))}

      {loading &&
        [...Array(6)].map((_, index) => (
          <ConversationSkeleton key={`converseSkeleton - ${index}`} />
        ))}
    </>
  );
};

export default ConversationList;
