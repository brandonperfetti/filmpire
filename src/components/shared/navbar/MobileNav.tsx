import { RootState } from "@/app/store";
import genreIcons from "@/assets/icons/genres";
import { Button } from "@/components/ui/button";
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
import { setUser, userSelector } from "@/features/auth";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { createSessionId, fetchToken, moviesApi } from "@/lib/utils";
import { useGetGenresQuery } from "@/services/TMDB";
import { GenreProps } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavContent = () => {
  const genreIdOrCategoryName = useSelector(
    (state: RootState) => state.currentGenreOrCategory.genreIdOrCategoryName,
  );
  const { data, error, isFetching } = useGetGenresQuery();

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
    <section className="flex h-full flex-col gap-6 pt-8">
      <div className="flex flex-col gap-3"></div>
      <Separator className="-mt-9" />
      Categories
      {categories.map((item) => {
        const isActive = genreIdOrCategoryName === item.value;

        return (
          <SheetClose asChild key={item.value}>
            <Link
              to={"/"}
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
        const isActive = genreIdOrCategoryName === (id as unknown);

        return (
          <SheetClose asChild key={`${id}_sheet`}>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(selectGenreOrCategory(id));
              }}
              key={id}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img
                src={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                alt={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                width={20}
                height={20}
                className={`${isActive ? "invert-colors" : ""}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
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
  const { isAuthenticated, user } = useSelector(userSelector);
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      // console.log("User is not authenticated, skipping login process.");
      return;
    }
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`,
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`,
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [dispatch, token, sessionIdFromLocalStorage]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          src="/src/assets/icons/hamburger.svg"
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

        <div className="flex-1 overflow-y-auto no-scrollbar pb-8 ">
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
            {!isAuthenticated && !user && (
              <SheetClose asChild>
                <Button
                  onClick={fetchToken}
                  className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none mt-4"
                >
                  <span className="primary-text-gradient text-base">
                    Log In
                  </span>
                </Button>
              </SheetClose>
            )}
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
