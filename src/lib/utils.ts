import { categories } from "@/constants";
import { GenreProps } from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: tmdbApiKey,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get("/authentication/token/new");
    const token = data.request_token;

    if (data.success) {
      localStorage.setItem("request_token", token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.error("Sorry your token could not be created", error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token");
  if (token) {
    try {
      const { data } = await moviesApi.post("/authentication/session/new", {
        request_token: token,
      });

      if (data.success) {
        localStorage.setItem("session_id", data.session_id);
        return data.session_id;
      }
    } catch (error) {
      console.error("Sorry your session could not be created", error);
    }
  }
};

export function getAge(birthdate: string): number {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If birth month is greater than the current month or it's the same month but the birth day hasn't passed yet, subtract one year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function getPrettyDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a date object using the specific year, month, and day
  const date = new Date(Date.UTC(year, month - 1, day + 1)); // month - 1 because months are 0-indexed

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function getLabelOrGenreName(
  genreIdOrCategoryName: string | number,
  genres: GenreProps[],
): string | undefined {
  // Check if genreIdOrCategoryName is a category value
  const category = categories.find(
    (cat) => cat.value === genreIdOrCategoryName,
  );

  if (category) {
    // If it matches a category, return the category label
    return category.label;
  } else {
    // Otherwise, treat it as a genre ID and get the genre name
    const genreId = Number(genreIdOrCategoryName);
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name; // Return the genre name or undefined if not found
  }
}
export const navbarHeight = 125;

export const scrollToElement = (
  ref: React.RefObject<HTMLDivElement>,
  navbarHeight?: number,
) => {
  const offset = navbarHeight || 0; // Use the provided navbar height or default to 0
  if (ref.current) {
    const topPosition =
      ref.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topPosition - offset,
      behavior: "smooth",
    });
  }
};

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
