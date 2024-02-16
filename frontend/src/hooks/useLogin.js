import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const login = async (usernameOrMail, password, remember) => {
    const success = handleUserInputValidation(usernameOrMail, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrMail, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (remember) {
        localStorage.setItem("f2fAuthUser", JSON.stringify(data));
      } else {
        sessionStorage.setItem("f2fAuthUser", JSON.stringify(data));
      }
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleUserInputValidation(usernameOrMail, password) {
  if (!usernameOrMail || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  return true;
}
