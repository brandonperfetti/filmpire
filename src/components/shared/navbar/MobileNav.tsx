import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const NavContent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              to={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          src="/assets/icons/hamburger.svg"
          width={34}
          height={34}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 flex flex-col border-none"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation links and user actions
        </SheetDescription>

        <div className="flex-1 overflow-y-auto">
          <Link to="/" className="flex items-center gap-1">
            <img
              src="/assets/images/site-logo.svg"
              width={23}
              height={23}
              alt="Filmpire"
            />

            <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
              Film<span className="text-primary-500">pire</span>
            </p>
          </Link>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
