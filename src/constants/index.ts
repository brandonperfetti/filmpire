import { CategoryProps } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const categories: CategoryProps[] = [
  {
    label: "Popular",
    value: "popular",
    icon: "/assets/icons/popcorn.svg",
    route: "/",
  },
  {
    label: "Top Rated",
    value: "top_rated",
    icon: "/assets/icons/star.svg",
    route: "/movies/top-rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
    icon: "/assets/icons/calendar.svg",
    route: "/movies/upcoming",
  },
];
