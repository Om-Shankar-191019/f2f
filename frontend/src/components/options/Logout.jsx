import React from "react";
import { CgLogOut } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      {!loading ? (
        <abbr title="Logout">
          <CgLogOut
            className="text-xl mr-1 text-white sm:text-themeColor font-bold cursor-pointer"
            onClick={handleLogout}
          />
        </abbr>
      ) : (
        <span className="loading loading-dots loading-md text-white sm:text-themeColor"></span>
      )}
    </>
  );
};

export default Logout;
