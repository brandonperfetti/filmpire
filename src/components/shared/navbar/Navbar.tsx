import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import Search from "./Search";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link to="/" className="flex items-center gap-1">
        <img
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="Filmpire"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 ">
          Film<span className="text-primary-500">pire</span>
        </p>
      </Link>
      <div className="relative w-full max-w-[500px] max-md:hidden">
        <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
          <Search />
        </div>
      </div>

      <div className="flex-between gap-5">
        <Theme />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
