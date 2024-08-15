import MobileNav from "./MobileNav";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <a href="/" className="flex items-center gap-1">
        <img
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="Filmpire"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Film<span className="text-primary-500">pire</span>
        </p>
      </a>
      <div className="flex-between gap-5">
        <Theme />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
