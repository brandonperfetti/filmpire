import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Movies",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/actors",
    label: "Actors",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile/:id",
    label: "Profile",
  },
];
