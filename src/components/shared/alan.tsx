import { useTheme } from "@/context/useTheme";
import {
  searchMovie,
  selectGenreOrCategory,
} from "@/features/currentGenreOrCategory";
import { alanAiKey, fetchToken } from "@/lib/utils.js";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useAlan(
  alanBtnContainer: React.RefObject<HTMLDivElement>,
) {
  const { setMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alanInstance = useRef<ReturnType<typeof alanBtn> | null>(null);
  const [isAlanReady, setIsAlanReady] = useState(false);

  useEffect(() => {
    if (isAlanReady && !alanInstance.current && alanBtnContainer.current) {
      alanInstance.current = alanBtn({
        key: alanAiKey,
        rootEl: alanBtnContainer.current,
        onCommand: ({ command, genres, genreOrCategory, mode, query }) => {
          console.log("Received command:", command);
          if (command === "chooseGenre") {
            const foundGenre = genres?.find(
              (g) => g?.name?.toLowerCase() === genreOrCategory?.toLowerCase(),
            );
            if (foundGenre) {
              dispatch(selectGenreOrCategory(foundGenre?.id));
            } else {
              const categoryName = genreOrCategory?.startsWith("top")
                ? "top_rated"
                : genreOrCategory;
              dispatch(selectGenreOrCategory(categoryName));
            }
            navigate("/");
          } else if (command === "search") {
            dispatch(searchMovie(query));
            navigate("/");
          } else if (command === "changeMode") {
            setMode(mode === "light" ? "light" : "dark");
          } else if (command === "login") {
            fetchToken();
          } else if (command === "logout") {
            localStorage.clear();
            navigate("/");
          }
        },
      });
    }
  }, [isAlanReady, alanBtnContainer, dispatch, navigate, setMode]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      console.log("First user interaction detected");
      setIsAlanReady(true);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  return null;
}
