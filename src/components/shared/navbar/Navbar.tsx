import { Button } from "@/components/ui/button";
import { setUser, userSelector } from "@/features/auth";
import { createSessionId, fetchToken, moviesApi } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDropdown from "../UserDropdown";
import MobileNav from "./MobileNav";
import Search from "./Search";
import Theme from "./Theme";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async () => {
      if (!token || isAuthenticated) {
        // No token or user already authenticated, no need to proceed
        return;
      }

      try {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`,
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          if (sessionId) {
            const { data: userData } = await moviesApi.get(
              `/account?session_id=${sessionId}`,
            );
            dispatch(setUser(userData));
          }
        }
      } catch (error) {
        console.error("Failed to log in user:", error);
      }
    };

    logInUser();
  }, [dispatch, token, sessionIdFromLocalStorage, isAuthenticated]);

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link to="/" className="flex items-center gap-1">
        <img
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="Filmpire"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Film<span className="text-primary-500">pire</span>
        </p>
      </Link>
      <div className="relative w-fit sm:w-auto flex-grow-0 md:flex-grow md:w-full md:max-w-[500px]">
        <div className="background-light800_darkgradient relative flex h-[36px] md:h-[56px] grow items-center gap-1 rounded-xl px-4">
          <Search />
        </div>
      </div>

      <div className="flex-between lg:gap-5">
        <Theme />
        {isAuthenticated && user ? (
          <div className="mr-2.5 md:mr-0">
            <UserDropdown user={user} />
          </div>
        ) : (
          <Button size="sm" className="hidden md:flex" onClick={fetchToken}>
            Login
          </Button>
        )}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
