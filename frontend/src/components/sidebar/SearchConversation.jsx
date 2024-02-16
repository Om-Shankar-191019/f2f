import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import useSearchUsers from "../../hooks/useSearchUsers";
const SearchConversation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, getSearches } = useSearchUsers();

  const handleClearSearch = async () => {
    setSearchTerm("");
    await getSearches("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSearches(searchTerm);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 my-2  border-b-2 border-themeColor "
    >
      <input
        type="text"
        placeholder="Search…"
        className=" text-md py-2 px-2 w-full outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-themeColor text-white hover:bg-themeColorHover "
      >
        <IoSearchSharp className="w-4 h-4 outline-none" />
      </button>
      {searchTerm.length > 0 && (
        <button
          type="button"
          className="p-2 rounded-full bg-themeColor text-white hover:bg-themeColorHover "
          onClick={handleClearSearch}
        >
          <IoCloseSharp className="w-4 h-4 outline-none" />
        </button>
      )}
    </form>
  );
};

export default SearchConversation;
