import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/constants";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { useGetGenresQuery } from "@/services/TMDB";
import { GenreProps } from "@/types";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import genreIcons from "../../../../public/assets/icons/genres";

const NavContent = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { data, error, isFetching } = useGetGenresQuery();
  console.log("Genre Data", data);

  const dispatch = useDispatch();

  if (isFetching) return <div className="flex justify-center">Loading...</div>;

  if (!data?.genres.length)
    return (
      <div className="flex align-bottom">
        <h4>No movies found</h4>
        <p>Please search for something else</p>
      </div>
    );

  if (error) return <div>An error occurred</div>;

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      <Separator className="-mt-9" />
      Categories
      {categories.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              to={item.route}
              onClick={() => {
                dispatch(selectGenreOrCategory(item.value));
              }}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img
                src={item.icon}
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
      <Separator />
      Genres
      {data.genres.map(({ name, id }: GenreProps) => {
        // const isActive =
        //   (pathname.includes(item.route) && item.route.length > 1) ||
        //   pathname === item.route;

        return (
          <SheetClose asChild key={`${id}_sheet`}>
            <Link
              to={"/"}
              key={id}
              className=" flex items-center justify-start gap-4 bg-transparent p-4"
              // className={`${
              //   isActive
              //     ? "primary-gradient rounded-lg text-light-900"
              //     : "text-dark300_light900"
              // } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img
                src={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                alt={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                width={20}
                height={20}
                // className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
              // className={`${isActive ? "base-bold" : "base-medium"}`}
              >
                {name}
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

        <div className="flex-1 overflow-y-auto pb-8 ">
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
