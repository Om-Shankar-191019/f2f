import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesReducer } from "../redux/slices/chatSlice";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    if (message.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(setMessagesReducer([...messages, data]));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
