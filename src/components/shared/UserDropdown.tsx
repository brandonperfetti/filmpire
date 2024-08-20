import { UserProps } from "@/types";

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
  const gravatarHash = user?.avatar?.gravatar?.hash;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 md:size-10 mt-1 md:mt-0">
          <AvatarImage src={`https://gravatar.com/avatar/${gravatarHash}`} />
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
            <Link to={`/profile/${user.id}`} className="hover:cursor-pointer">
              <span className="body-semibold">Profile</span>
            </Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem asChild>
            <Link to={`/`} onClick={logout} className="hover:cursor-pointer">
              <span className="body-semibold hover:text-primary w-full">
                Logout
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
