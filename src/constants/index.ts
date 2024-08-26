import { CategoryProps } from "@/types";
import { cva } from "class-variance-authority";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const categories: CategoryProps[] = [
  {
    label: "Now Playing",
    value: "now_playing",
    icon: "/assets/icons/clapperboard.svg",
    route: "/",
  },
  {
    label: "Upcoming",
    value: "upcoming",
    icon: "/assets/icons/calendar.svg",
    route: "/movies/upcoming",
  },
  {
    label: "Top Rated",
    value: "top_rated",
    icon: "/assets/icons/star.svg",
    route: "/movies/top-rated",
  },
  {
    label: "Popular",
    value: "popular",
    icon: "/assets/icons/popcorn.svg",
    route: "/",
  },
];

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
