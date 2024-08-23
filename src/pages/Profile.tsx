import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userSelector } from "@/features/auth";
import { navbarHeight, scrollToElement } from "@/lib/utils";
import { useGetListQuery } from "@/services/TMDB";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [isFavoritesPaginationTriggered, setIsFavoritesPaginationTriggered] =
    useState(false);

  const [watchlistPage, setWatchlistPage] = useState(1);
  const [isWatchlistPaginationTriggered, setIsWatchlistPaginationTriggered] =
    useState(false);

  const { user } = useSelector(userSelector);
  const gravatarHash = user?.avatar?.gravatar?.hash;

  // console.log("user", user);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user?.id,
    sessionId: localStorage?.getItem("session_id"),
    page: favoritesPage,
  });
  // console.log("favoriteMovies", favoriteMovies);

  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user?.id,
      sessionId: localStorage?.getItem("session_id"),
      page: watchlistPage,
    });
  // console.log("watchlistMovies", watchlistMovies);

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, [refetchFavorites, refetchWatchlisted]);

  const favoritesRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFavoritesPaginationTriggered && favoritesRef.current) {
      scrollToElement(favoritesRef, navbarHeight);
      setIsFavoritesPaginationTriggered(false);
    }
  }, [favoritesPage, isFavoritesPaginationTriggered]);

  useEffect(() => {
    if (isWatchlistPaginationTriggered && watchlistRef.current) {
      scrollToElement(watchlistRef, navbarHeight);
      setIsWatchlistPaginationTriggered(false);
    }
  }, [watchlistPage, isWatchlistPaginationTriggered]);

  const handleFavoritesPageChange: Dispatch<SetStateAction<number>> = (
    newPage,
  ) => {
    if (typeof newPage === "number") {
      setFavoritesPage(newPage);
    } else {
      setFavoritesPage((prevPage) => newPage(prevPage));
    }
    setIsFavoritesPaginationTriggered(true);
  };

  const handleWatchlistPageChange: Dispatch<SetStateAction<number>> = (
    newPage,
  ) => {
    if (typeof newPage === "number") {
      setWatchlistPage(newPage);
    } else {
      setWatchlistPage((prevPage) => newPage(prevPage));
    }
    setIsWatchlistPaginationTriggered(true);
  };

  return (
    <>
      <h1 className="h1-bold mb-2 md:mb-6 text-dark100_light900">My Profile</h1>
      <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100 h-full">
        <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <img
              src={
                user?.avatar.tmdb.avatar_path
                  ? `https://image.tmdb.org/t/p/w500/${user?.avatar.tmdb.avatar_path}`
                  : `https://gravatar.com/avatar/${gravatarHash}?s=200`
              }
              alt="profile picture"
              width={140}
              height={140}
              className="rounded-full object-cover"
            />

            <div className="mt-3">
              <h2 className="h2-bold text-dark100_light900">{user?.name}</h2>
              <p className="paragraph-regular text-dark200_light800">
                @{user?.username}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-10">
          <Tabs defaultValue="favorites" className="flex-1">
            <TabsList className="background-light800_dark400 min-h-[42px] p-1">
              <TabsTrigger value="favorites" className="tab">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="watchlist" className="tab">
                Watchlist
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="favorites"
              className="mt-5 flex w-full flex-col gap-6"
            >
              {favoriteMovies?.results?.length ? (
                <div ref={favoritesRef}>
                  <div className="my-4">
                    <MovieList movies={favoriteMovies} />
                  </div>
                  <Pagination
                    pageNumber={favoritesPage}
                    setPage={handleFavoritesPageChange}
                    totalPages={favoriteMovies?.total_pages}
                  />
                </div>
              ) : (
                <div className="mx-auto p-9 sm:px-11">No Favorites</div>
              )}
            </TabsContent>
            <TabsContent
              value="watchlist"
              className="flex w-full flex-col gap-6"
            >
              {watchlistMovies?.results?.length ? (
                <div ref={watchlistRef}>
                  <div className="my-4">
                    <MovieList movies={watchlistMovies} />
                  </div>
                  <Pagination
                    pageNumber={watchlistPage}
                    setPage={handleWatchlistPageChange}
                    totalPages={watchlistMovies?.total_pages}
                  />
                </div>
              ) : (
                <div className="mx-auto p-9 sm:px-11">
                  No Watchlisted Movies
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
