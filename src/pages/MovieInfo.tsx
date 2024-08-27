import ImageCarouselItem from "@/components/shared/ImageCarouselItem";
import LazyVideo from "@/components/shared/LazyVideo";
import MovieButtons from "@/components/shared/MovieButtons";
import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import Rating from "@/components/shared/Rating";
import WatchProviders from "@/components/shared/WatchProviders";
import MovieInfoPageSkeleton from "@/components/skeletons/MovieInfoPageSkeleton";
import TopCast from "@/components/TopCast";
import TopCrew from "@/components/TopCrew";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/useTheme";
import { userSelector } from "@/features/auth";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import useCountry from "@/hooks/useCountry";
import {
  getPreferredLanguage,
  getPreferredReleaseDate,
  getPreferredTrailer,
  getPrettyDate,
  mergeDuplicateCrewMembers,
  scrollToElement,
  tmdbApiKey,
} from "@/lib/utils";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetMovieWatchProvidersQuery,
  useGetRecommendationsQuery,
} from "@/services/TMDB";
import { MovieDetailsProps, WatchProviderProps } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import genreIcons from "./../../public/assets/icons/genres";

const MovieInfoPage = () => {
  const { user } = useSelector(userSelector);
  const userCountry = useCountry() || "";
  // console.log("userCountry, ", userCountry);
  const { id } = useParams();
  const { mode } = useTheme();
  const dispatch = useDispatch();
  const topMoviesRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [isPaginationTriggered, setIsPaginationTriggered] = useState(false);
  const [isTrailerDialogOpen, setIsTrailerDialogOpen] = useState(false);
  const [isPostersDialogOpen, setIsPostersDialogOpen] = useState(false); // New state for posters dialog
  const [isBackdropsDialogOpen, setIsBackdropsDialogOpen] = useState(false); // New state for backdrops dialog
  const [isVideosDialogOpen, setIsVideosDialogOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data: movieData, isFetching, isError } = useGetMovieQuery(id || "");
  // console.log(movieData);

  const topCast = movieData?.credits?.cast || [];
  const topCrew = mergeDuplicateCrewMembers(movieData?.credits?.crew || []);

  const {
    data: watchProvidersData,
    isFetching: isFetchingwatchProviders,
    isError: isWatchProvidersError,
  } = useGetMovieWatchProvidersQuery(id);

  const filteredWatchProviders: WatchProviderProps =
    watchProvidersData?.results?.[userCountry] ||
    watchProvidersData?.results?.["US"] || // Fallback to 'US' if available
    {};

  // console.log(watchProvidersData);
  // console.log(filteredWatchProviders);

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user?.id,
    sessionId: localStorage?.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user?.id,
    sessionId: localStorage?.getItem("session_id"),
    page: 1,
  });

  const {
    data: recommendationsData,
    isFetching: isRecommendationsFetching,
    isError: isRecommendationsError,
  } = useGetRecommendationsQuery({ id: id || "", page });
  // console.log(recommendationsData);

  const handlePageChange: Dispatch<SetStateAction<number>> = (newPage) => {
    if (typeof newPage === "number") {
      setPage(newPage);
    } else {
      setPage((prevPage) => newPage(prevPage));
    }
    setIsPaginationTriggered(true);
  };

  const preferredLanguage = getPreferredLanguage(
    movieData?.spoken_languages || [],
    userCountry,
  );

  const preferredReleaseDate = getPreferredReleaseDate(
    movieData?.release_dates?.results || [],
    userCountry,
  );

  const preferredTrailer = getPreferredTrailer(
    movieData?.videos?.results || [],
  );

  const formattedReleaseDate = preferredReleaseDate
    ? getPrettyDate(preferredReleaseDate.release_date)
    : "N/A";

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id",
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      },
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id",
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      },
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  useEffect(() => {
    if (isPaginationTriggered && topMoviesRef.current) {
      scrollToElement(topMoviesRef);
      setIsPaginationTriggered(false);
    }
  }, [page, isPaginationTriggered]);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find(
        (movie: MovieDetailsProps) => movie?.id === movieData?.id,
      ),
    );
  }, [favoriteMovies, movieData]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find(
        (movie: MovieDetailsProps) => movie?.id === movieData?.id,
      ),
    );
  }, [watchlistMovies, movieData]);

  if (isFetching || isRecommendationsFetching || isFetchingwatchProviders)
    return <MovieInfoPageSkeleton />;
  if (isError || isRecommendationsError || isWatchProvidersError)
    return <Link to={"/"}>Something Has Gone Wrong, Go Home</Link>;

  return (
    <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100">
      <div className="grid justify-around grid-cols-1 md:grid-cols-3">
        <div>
          <img
            src={
              movieData?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`
                : "/assets/images/movie-placeholder.webp"
            }
            alt={movieData?.title}
            className="rounded-2xl shadow-2xl sm:my-0 mx-auto md:mx-0 h-auto md:w-[80%]"
          />
        </div>
        <div className="grid col-span-2">
          <div className="my-4 md:my-0">
            <h3 className="h1-bold mb-2 text-center text-dark100_light900">
              {movieData?.title} ( {movieData?.release_date.split("-")[0]} )
            </h3>
            <h5 className="mb-2 text-center text-dark200_light900">
              {movieData?.tagline}
            </h5>
            {movieData?.vote_average && (
              <div className="flex justify-center items-center flex-wrap gap-4">
                <Rating value={movieData?.vote_average / 2} precision={0.1} />
                <p className="text-dark300_light700">
                  {(movieData?.vote_average / 2).toFixed(2)} / 5{" "}
                </p>
                <div className="text-dark300_light700">
                  {movieData?.runtime} min /{" "}
                  {movieData?.spoken_languages.length > 0
                    ? preferredLanguage
                    : ""}
                </div>
              </div>
            )}
            <div className="flex my-3 max-w-fit mx-auto">
              {movieData?.genres.map((genre) => (
                <Link
                  className="mx-auto flex flex-wrap justify-around text-dark300_light900 hover:text-primary"
                  to={`/`}
                  key={genre.id}
                  onClick={() => {
                    dispatch(selectGenreOrCategory(genre.id));
                  }}
                >
                  <img
                    src={
                      genreIcons[
                        genre.name.toLowerCase() as keyof typeof genreIcons
                      ]
                    }
                    alt={
                      genreIcons[
                        genre.name.toLowerCase() as keyof typeof genreIcons
                      ]
                    }
                    width={20}
                    height={20}
                    className={`${
                      mode === "dark" ? "" : "invert-colors"
                    } ml-3 mr-2`}
                  />
                  <p className="md:mr-2 hover:text-primary">{genre.name}</p>
                </Link>
              ))}
            </div>
            {/* Display release date and note */}
            <div className="text-center mt-4 text-dark400_light800">
              {preferredReleaseDate && (
                <p className="paragraph-regular">
                  Released: {formattedReleaseDate}{" "}
                  {preferredReleaseDate?.note && (
                    <span>/ {preferredReleaseDate.note}</span>
                  )}
                </p>
              )}

              {/* Display rating and budget */}
              {movieData?.budget && movieData?.budget > 0 && (
                <p>Budget: ${movieData?.budget?.toLocaleString()}</p>
              )}
              {preferredReleaseDate && (
                <p className="paragraph-regular">
                  {preferredReleaseDate.certification &&
                    `Rated: ${preferredReleaseDate.certification}`}
                </p>
              )}
            </div>
            <h5 className="h3-semibold mt-6 text-dark100_light900">Overview</h5>
            <p className="my-6 p-4 overflow-auto paragraph-regular text-dark400_light800">
              {movieData?.overview}
            </p>

            <TopCast cast={topCast} />
            <TopCrew crew={topCrew} />

            {filteredWatchProviders.link && (
              <WatchProviders filteredWatchProviders={filteredWatchProviders} />
            )}
            <MovieButtons
              movieData={movieData as MovieDetailsProps}
              isMovieFavorited={isMovieFavorited}
              isMovieWatchlisted={isMovieWatchlisted}
              addToFavorites={addToFavorites}
              addToWatchlist={addToWatchlist}
              setIsTrailerDialogOpen={setIsTrailerDialogOpen}
              setIsVideosDialogOpen={setIsVideosDialogOpen}
              setIsPostersDialogOpen={setIsPostersDialogOpen}
              setIsBackdropsDialogOpen={setIsBackdropsDialogOpen}
            />
          </div>
        </div>
      </div>
      {recommendationsData?.results &&
        recommendationsData?.results?.length > 0 && (
          <div className="my-5 md:mt-12 w-full" ref={topMoviesRef}>
            <h3 className="h3-semibold text-dark100_light900">
              You might also like
            </h3>
            {recommendationsData && (
              <div className="my-6">
                <MovieList movies={recommendationsData} numberOfMovies={12} />
              </div>
            )}
            <Pagination
              pageNumber={page}
              setPage={handlePageChange}
              totalPages={recommendationsData?.total_pages}
            />
          </div>
        )}
      {/* Backdrops Dialog */}
      <Dialog
        open={isBackdropsDialogOpen} // Open state for backdrops dialog
        onOpenChange={() => setIsBackdropsDialogOpen(false)}
      >
        <DialogContent className="max-w-[90%] md:max-w-[75%] lg:max-w-[65%] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{movieData?.title} Wallpapers</DialogTitle>
          </DialogHeader>
          {movieData?.images?.backdrops &&
          movieData?.images?.backdrops?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 xxs:max-w-[19rem] xs:max-w-[21rem] sm:max-w-[20rem] xl:max-w-[59em] max-h-[10em] lg:max-h-[40em] 2xl:max-w-[75.5em]">
                  {movieData.images.backdrops.map((backdrop) => (
                    <CarouselItem key={backdrop.file_path} className="w-full">
                      <ImageCarouselItem
                        image={backdrop}
                        maxWidth={backdrop.width / 2}
                        maxHeight={backdrop.height / 3}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <p className="text-dark400_light800">No Backdrops Available</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Posters Dialog */}
      <Dialog
        open={isPostersDialogOpen} // Open state for posters dialog
        onOpenChange={() => setIsPostersDialogOpen(false)}
      >
        <DialogContent className="max-w-[85%] md:max-w-[59%] lg:max-w-[28rem] 2xl:max-w-[24%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{movieData?.title} Posters</DialogTitle>
          </DialogHeader>
          {movieData?.images?.posters &&
          movieData?.images?.posters?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 xxs:max-w-[18.5rem] xs:max-w-[21rem] sm:max-w-[20rem] md:max-w-[26em]">
                  {movieData.images.posters.map((poster) => (
                    <CarouselItem key={poster.file_path}>
                      <ImageCarouselItem image={poster} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <p className="text-dark400_light800">No Posters Available</p>
          )}
        </DialogContent>
      </Dialog>
      {/* Videos Dialog */}
      <Dialog
        open={isVideosDialogOpen}
        onOpenChange={() => setIsVideosDialogOpen(false)}
      >
        <DialogContent className="max-w-[85%] md:max-w-[50%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Watch {movieData?.title} Videos</DialogTitle>
          </DialogHeader>
          {movieData?.videos?.results &&
          movieData?.videos?.results?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 max-w-[18rem] md:max-w-[26rem] lg:max-w-[44rem] 2xl:max-w-[57.75rem]">
                  {movieData.videos.results.map((video) => (
                    <CarouselItem key={video.id} className="relative">
                      <LazyVideo videoKey={video.key} title={video.name} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <p className="text-dark400_light800">No Videos Available</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Trailer Dialog */}
      <Dialog
        open={isTrailerDialogOpen}
        onOpenChange={() => setIsTrailerDialogOpen(false)}
      >
        <DialogContent className="max-w-[95%] md:max-w-[80%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Watch {movieData?.title} Trailer</DialogTitle>
          </DialogHeader>
          {movieData?.videos?.results &&
          movieData?.videos?.results?.length > 0 ? (
            <iframe
              className="w-full py-4 h-64 md:h-[600px] rounded"
              title="Trailer"
              src={`https://www.youtube.com/embed/${preferredTrailer?.key}?autoplay=1`}
              allow="autoplay; fullscreen"
            />
          ) : (
            <p className="text-dark400_light800">No Trailer Available</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieInfoPage;
