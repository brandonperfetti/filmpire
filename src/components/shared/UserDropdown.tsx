import { UserProps } from "@/types";

import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserDropdown({ user }: { user: UserProps }) {
  const tmdbAvatarPath = user?.avatar?.tmdb?.avatar_path;
  const gravatarHash = user?.avatar?.gravatar?.hash;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 md:size-10 mt-1 md:mt-0">
        <AvatarImage
            src={
              tmdbAvatarPath
                ? `https://image.tmdb.org/t/p/w500/${tmdbAvatarPath}`
                : gravatarHash
                ? `https://www.gravatar.com/avatar/${gravatarHash}?s=200`
                : `https://github.com/shadcn.png`
            }
            alt="User Avatar"
          />
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={8}
          align="center"
          className="absolute -right-12 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300"
        >
          <DropdownMenuItem asChild>
            <Link
              to={`/profile/${user.id}`}
              className="hover:cursor-pointer py-2 px-2.5"
            >
              <span className="body-semibold flex">
                <User className="w-4 h-4 mr-2" />
                Profile
              </span>
            </Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem asChild>
            <Link
              to={`/`}
              onClick={logout}
              className="hover:cursor-pointer py-2 px-2.5"
            >
              <span className="body-semibold hover:text-primary w-full flex">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
