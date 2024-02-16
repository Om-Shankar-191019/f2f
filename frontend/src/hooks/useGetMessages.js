import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesReducer } from "../redux/slices/chatSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedConversation, messages } = useSelector((state) => state.chat);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(setMessagesReducer(data));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      getMessages();
    }
  }, [selectedConversation?._id]);
  return { loading, messages };
};

export default useGetMessages;
