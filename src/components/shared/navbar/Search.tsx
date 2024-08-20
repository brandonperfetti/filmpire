import { Input } from "@/components/ui/input";
import { searchMovie } from "@/features/currentGenreOrCategory";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(searchTerm));
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <img
        src="/src/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer max-sm:hidden"
      />
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default Search;
