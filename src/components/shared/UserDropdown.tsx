import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserDropdown({ user }: { user: User }) {
  const gravatarHash = user?.avatar?.gravatar?.hash;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            className="rounded-3xl object-cover size-8 md:size-10"
            src={`https://gravatar.com/avatar/${gravatarHash}`}
          />
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={8} align="center">
          <DropdownMenuItem asChild>
            <Link to={`/profile/${user.id}`}>Profile</Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem asChild>
            <Link to={`/`} onClick={logout}>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
