import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tmdpApiKey = import.meta.env.VITE_TMDB_KEY;

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: tmdpApiKey,
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
