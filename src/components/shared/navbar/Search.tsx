import { Input } from "@/components/ui/input";
import { searchMovie } from "@/features/currentGenreOrCategory";
import { useDebounceValue } from "@/lib/utils";
import { X } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    dispatch(searchMovie(""));
  }, [setSearchTerm, dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchMovie(debouncedSearchTerm));
      navigate("/");
      window.scrollTo(0, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "k" &&
        document.activeElement !== searchInputRef.current
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.body.addEventListener("keydown", onKeyPress);
    return () => {
      document.body.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearSearch();
      }
    }
    document.body.addEventListener("keydown", onKeyPress);
    return () => {
      document.body.removeEventListener("keydown", onKeyPress);
    };
  }, [clearSearch]);

  return (
    <>
      <img
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer max-sm:hidden"
      />
      <Input
        ref={searchInputRef}
        type="text"
        placeholder=" ⌘K to Search..."
        value={searchTerm}
        className="text-sm md:paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      {searchTerm && (
        <X
          className=" size-4 md:size-6 text-gray-500 hover:cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </>
  );
};

export default Search;
