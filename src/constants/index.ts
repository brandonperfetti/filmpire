import { CategoryProps } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/src/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/src/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/src/assets/icons/computer.svg" },
];

export const categories: CategoryProps[] = [
  {
    label: "Popular",
    value: "popular",
    icon: "/src/assets/icons/popcorn.svg",
    route: "/",
  },
  {
    label: "Top Rated",
    value: "top_rated",
    icon: "/src/assets/icons/star.svg",
    route: "/movies/top-rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
    icon: "/src/assets/icons/calendar.svg",
    route: "/movies/upcoming",
  },
];
