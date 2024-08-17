import { CategoryProps, GenreProps } from "@/types";

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

export const genres: GenreProps[] = [
  {
    label: "Action",
    value: "action",
    icon: "/assets/icons/bomb.svg",
    route: "/movies/action",
  },
  {
    label: "Drama",
    value: "drama",
    icon: "/assets/icons/drama.svg",
    route: "/movies/comedy",
  },
  {
    label: "Horror",
    value: "horror",
    icon: "/assets/icons/skull.svg",
    route: "/movies/horror",
  },
  {
    label: "Animation",
    value: "animation",
    icon: "/assets/icons/palette.svg",
    route: "/movies/animation",
  },
];
