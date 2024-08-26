import { categories } from "@/constants";
import {
  CrewMemberProps,
  GenreProps,
  ReleaseDateProps,
  ReleaseDatesResultProps,
  SpokenLanguageProps,
  VideoProps,
} from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
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
  let date: Date;

  // Check if the date string includes a time component (e.g., "2024-07-22T00:00:00.000Z")
  if (dateString.includes("T")) {
    date = new Date(dateString);
  } else {
    const [year, month, day] = dateString.split("-").map(Number);
    date = new Date(Date.UTC(year, month - 1, day));
  }

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

export const getPreferredLanguage = (
  spokenLanguages: SpokenLanguageProps[],
  userCountry: string,
): string => {
  // Normalize the userCountry to match the ISO 639-1 language codes
  const normalizedCountry = userCountry.toLowerCase();

  // Check for a language that matches the user's country
  const matchingLanguage = spokenLanguages.find(
    (language) => language.iso_639_1.toLowerCase() === normalizedCountry,
  );

  // If a match is found, return the corresponding language
  if (matchingLanguage) {
    return matchingLanguage.english_name;
  }

  // Default to English if it's available in the spokenLanguages array
  const englishLanguage = spokenLanguages.find(
    (language) => language.iso_639_1.toLowerCase() === "en",
  );

  if (englishLanguage) {
    return englishLanguage.english_name;
  }

  // If no match is found and English isn't available, return the first language in the array
  return spokenLanguages.length > 0 ? spokenLanguages[0].english_name : "N/A";
};

export const getPreferredReleaseDate = (
  releaseDates: ReleaseDatesResultProps[],
  userCountry: string,
): ReleaseDateProps | undefined => {
  // Normalize the userCountry to match the ISO 3166-1 country codes
  const normalizedCountry = userCountry.toUpperCase();

  // Check for a release date that matches the user's country
  const matchingCountryRelease = releaseDates.find(
    (result) => result.iso_3166_1 === normalizedCountry,
  );

  if (
    matchingCountryRelease &&
    matchingCountryRelease.release_dates.length > 0
  ) {
    return matchingCountryRelease.release_dates[0];
  }

  // Default to US if it's available
  const usRelease = releaseDates.find((result) => result.iso_3166_1 === "US");

  if (usRelease && usRelease.release_dates.length > 0) {
    return usRelease.release_dates[0];
  }

  // Return undefined if no match is found
  return undefined;
};

export function getPreferredTrailer(
  videos: VideoProps[],
): VideoProps | undefined {
  if (!videos || videos.length === 0) return undefined;

  // Look for "Official Trailer"
  const officialTrailer = videos.find((video) =>
    video.name.toLowerCase().includes("official trailer"),
  );

  // If no "Official Trailer", look for any "Trailer"
  if (!officialTrailer) {
    const trailer = videos.find((video) =>
      video.name.toLowerCase().includes("trailer"),
    );

    return trailer || videos[0];
  }

  return officialTrailer;
}

export function mergeDuplicateCrewMembers(
  crew: CrewMemberProps[],
): CrewMemberProps[] {
  const crewMap: Record<number, CrewMemberProps> = {};
  const mergedCrew: CrewMemberProps[] = [];

  crew.forEach((member) => {
    if (crewMap[member.id]) {
      // If the member already exists in the map, merge the job and department
      const existingMember = crewMap[member.id];

      // Ensure jobs and departments are merged and unique
      const mergedJobs = new Set<string>([
        ...existingMember.job,
        ...(Array.isArray(member.job) ? member.job : [member.job]),
      ]);
      const mergedDepartments = new Set<string>([
        ...existingMember.department,
        ...(Array.isArray(member.department)
          ? member.department
          : [member.department]),
      ]);

      existingMember.job = Array.from(mergedJobs);
      existingMember.department = Array.from(mergedDepartments);
    } else {
      // If the member doesn't exist in the map, add them to the map and the result array
      crewMap[member.id] = {
        ...member,
        job: Array.isArray(member.job) ? member.job : [member.job],
        department: Array.isArray(member.department)
          ? member.department
          : [member.department],
      };
      mergedCrew.push(crewMap[member.id]);
    }
  });

  // Format the jobs and departments as strings separated by commas
  mergedCrew.forEach((member) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    member.job = member.job.join(", ") as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    member.department = member.department.join(", ") as any;
  });

  // Return the merged crew members as an array while preserving order
  return mergedCrew;
}
