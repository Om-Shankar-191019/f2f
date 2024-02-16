import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setConversationsReducer } from "../redux/slices/chatSlice";

const useSearchUsers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getSearches = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/search?searchTerm=${searchTerm}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.length > 0) {
        dispatch(setConversationsReducer(data));
      } else {
        toast.error("user not found.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getSearches };
};

export default useSearchUsers;
