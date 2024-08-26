import ImageCarouselItem from "@/components/shared/ImageCarouselItem";
import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import Rating from "@/components/shared/Rating";
import WatchProviders from "@/components/shared/WatchProviders";
import MovieInfoPageSkeleton from "@/components/skeletons/MovieInfoPageSkeleton";
import TopCast from "@/components/TopCast";
import TopCrew from "@/components/TopCrew";
import { Button } from "@/components/ui/button";
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
import {
  ArrowLeft,
  Clapperboard,
  Film,
  Globe,
  Heart,
  Image,
  Minus,
  Plus,
  Video,
  Wallpaper,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import genreIcons from "./../../public/assets/icons/genres";

const MovieInfoPage = () => {
  const { user } = useSelector(userSelector);
  const userCountry = useCountry() || "";
  // console.log("userCountry, ", userCountry);
  const { id } = useParams();
  const navigate = useNavigate();
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

  const { data, isFetching, isError } = useGetMovieQuery(id);
  const movieData = data as MovieDetailsProps;
  console.log(movieData);

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
  } = useGetRecommendationsQuery({ id, page });

  const preferredLanguage = getPreferredLanguage(
    data?.spoken_languages || [],
    userCountry,
  );

  const preferredReleaseDate = getPreferredReleaseDate(
    data?.release_dates?.results || [],
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
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find(
        (movie: MovieDetailsProps) => movie?.id === data?.id,
      ),
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find(
        (movie: MovieDetailsProps) => movie?.id === data?.id,
      ),
    );
  }, [watchlistMovies, data]);

  useEffect(() => {
    if (isPaginationTriggered && topMoviesRef.current) {
      scrollToElement(topMoviesRef);
      setIsPaginationTriggered(false);
    }
  }, [page, isPaginationTriggered]);

  const handlePageChange: Dispatch<SetStateAction<number>> = (newPage) => {
    if (typeof newPage === "number") {
      setPage(newPage);
    } else {
      setPage((prevPage) => newPage(prevPage));
    }
    setIsPaginationTriggered(true);
  };

  if (isFetching || isRecommendationsFetching || isFetchingwatchProviders)
    return <MovieInfoPageSkeleton />;
  if (isError || isRecommendationsError || isWatchProvidersError)
    return <Link to={"/"}>Something Has Gone Wrong, Go Home</Link>;

  const topCast = movieData?.credits?.cast || [];
  const topCrew = mergeDuplicateCrewMembers(movieData?.credits?.crew || []);
  // console.log(topCrew);

  return (
    <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100">
      <div className="grid justify-around grid-cols-1 md:grid-cols-3">
        <div>
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
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
              {movieData?.budget > 0 && (
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
              {movieData.overview}
            </p>

            <TopCast cast={topCast} />
            <TopCrew crew={topCrew} />

            {filteredWatchProviders.link && (
              <WatchProviders filteredWatchProviders={filteredWatchProviders} />
            )}
            <div className="grid xl:flex gap-4 flex-wrap">
              <div className="space-y-4 md:space-y-0 md:flex flex-wrap gap-2">
                <Link to={movieData?.homepage || ""}>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto my-2 md:my-0"
                  >
                    <Globe color="red" className="mr-2 size-4" />
                    Website
                  </Button>
                </Link>
                <Link to={`https://imdb.com/title/${movieData?.imdb_id}`}>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto my-2 md:my-0"
                  >
                    <Clapperboard color="red" className="mr-2 size-4" />
                    IMDB
                  </Button>
                </Link>
                {/* New Social Media Buttons */}
                {movieData.external_ids.facebook_id && (
                  <Link
                    to={`https://facebook.com/${movieData.external_ids.facebook_id}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full md:w-auto my-2 md:my-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="#D60A17"
                      >
                        <path d="M22.675 0h-21.35c-.731 0-1.325.595-1.325 1.326v21.348c0 .731.594 1.326 1.325 1.326h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.896-4.788 4.666-4.788 1.325 0 2.465.099 2.797.143v3.241h-1.918c-1.503 0-1.794.714-1.794 1.762v2.313h3.587l-.467 3.622h-3.12v9.294h6.115c.73 0 1.324-.595 1.324-1.326v-21.348c0-.731-.594-1.326-1.325-1.326z" />
                      </svg>
                      Facebook
                    </Button>
                  </Link>
                )}
                {movieData.external_ids.instagram_id && (
                  <Link
                    to={`https://instagram.com/${movieData.external_ids.instagram_id}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full md:w-auto my-2 md:my-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="#D60A17"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.243 1.322 3.608.058 1.266.07 1.647.07 4.837s-.012 3.571-.07 4.837c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.243 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.243-1.322-3.608-.058-1.266-.07-1.647-.07-4.837s.012-3.571.07-4.837c.062-1.366.347-2.633 1.322-3.608.975-.975 2.243-1.26 3.608-1.322 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.67.013-4.947.072-1.518.067-2.944.407-4.043 1.506-1.099 1.099-1.439 2.525-1.506 4.043-.059 1.277-.072 1.688-.072 4.947s.013 3.67.072 4.947c.067 1.518.407 2.944 1.506 4.043 1.099 1.099 2.525 1.439 4.043 1.506 1.277.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.518-.067 2.944-.407 4.043-1.506 1.099-1.099 1.439-2.525 1.506-4.043.059-1.277.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.067-1.518-.407-2.944-1.506-4.043-1.099-1.099-2.525-1.439-4.043-1.506-1.277-.059-1.688-.072-4.947-.072z" />
                        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
                      </svg>
                      Instagram
                    </Button>
                  </Link>
                )}
                {movieData.external_ids.twitter_id && (
                  <Link
                    to={`https://twitter.com/${movieData.external_ids.twitter_id}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full md:w-auto my-2 md:my-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="#D60A17"
                      >
                        <path d="M24 4.557c-.883.392-1.83.656-2.825.775 1.014-.608 1.794-1.572 2.163-2.724-.949.564-2.003.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.923 0 .386.044.762.128 1.124-4.09-.205-7.713-2.165-10.141-5.144-.424.729-.667 1.577-.667 2.482 0 1.71.87 3.213 2.19 4.098-.807-.026-1.567-.247-2.229-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.171-1.296.171-.318 0-.626-.031-.928-.089.627 1.956 2.445 3.379 4.6 3.42-1.685 1.32-3.808 2.106-6.115 2.106-.397 0-.788-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.058 0 14.01-7.504 14.01-14.009 0-.213-.005-.425-.015-.636.964-.697 1.8-1.562 2.462-2.549z" />
                      </svg>
                      Twitter
                    </Button>
                  </Link>
                )}
                {/* {movieData.external_ids.wikidata_id && (
                  <Link
                    to={`https://www.wikidata.org/wiki/${movieData.external_ids.wikidata_id}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full md:w-auto my-2 md:my-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="#D60A17"
                      >
                        <path d="M0 2.455v19.09h24v-19.09h-24zm3.429 16.91h-1.501v-10.364h1.5v10.364zm3.108 0h-1.501v-9.209h1.5v9.209zm3.108 0h-1.501v-10.364h1.5v10.364zm3.108 0h-1.5v-10.364h1.5v10.364zm3.108 0h-1.501v-9.209h1.5v9.209zm3.107 0h-1.5v-10.364h1.5v10.364z" />
                      </svg>
                      Wikidata
                    </Button>
                  </Link>
                )} */}

                <Button
                  variant="outline"
                  onClick={() => setIsTrailerDialogOpen(true)}
                  className="w-full md:w-auto"
                >
                  <Film color="red" className="mr-2 size-4" /> Trailer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsVideosDialogOpen(true)}
                  className="w-full md:w-auto"
                >
                  <Video color="red" className="mr-2 size-4" /> Videos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPostersDialogOpen(true)}
                  className="w-full md:w-auto"
                >
                  <Image color="red" className="mr-2 size-4" /> Posters
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsBackdropsDialogOpen(true)}
                  className="w-full md:w-auto"
                >
                  <Wallpaper color="red" className="mr-2 size-4" /> Wallpapers
                </Button>
              </div>
              <div className="space-y-4 md:space-y-0 md:flex md:space-x-2 ">
                {user && (
                  <>
                    <Button
                      variant={isMovieFavorited ? "destructive" : "outline"}
                      onClick={addToFavorites}
                      className="w-full md:w-auto"
                    >
                      <Heart
                        color={isMovieFavorited ? "white" : "red"}
                        className="mr-2 size-4"
                      />{" "}
                      {isMovieFavorited ? "Unfavorite" : "Add to Favorites"}
                    </Button>
                    <Button
                      variant={isMovieWatchlisted ? "destructive" : "outline"}
                      onClick={addToWatchlist}
                      className="w-full md:w-auto"
                    >
                      {isMovieWatchlisted ? (
                        <Minus color={"white"} className="mr-2 size-4" />
                      ) : (
                        <Plus color={"red"} className="mr-2 size-4" />
                      )}
                      Watchlist
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full md:w-auto"
              >
                <ArrowLeft color={"red"} className="mr-2 size-4" /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>
      {recommendationsData.results.length > 0 && (
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
        <DialogContent className="max-w-[80%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{movieData.title} Wallpapers</DialogTitle>
          </DialogHeader>
          {movieData?.images?.backdrops?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 max-w-[18.5rem] md:max-w-[26rem]">
                  {movieData.images.backdrops.map((backdrop) => (
                    <CarouselItem key={backdrop.file_path}>
                      <ImageCarouselItem image={backdrop} />
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
        <DialogContent className="max-w-[80%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{movieData.title} Posters</DialogTitle>
          </DialogHeader>
          {movieData?.images?.posters?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 max-w-[18.5rem] md:max-w-[26rem]">
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
        <DialogContent className="max-w-[80%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Watch {movieData.title} Videos</DialogTitle>
          </DialogHeader>
          {movieData?.videos?.results?.length > 0 ? (
            <div className="relative">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent className="space-x-4 max-w-[16rem] md:max-w-[26rem] lg:max-w-[73rem]">
                  {movieData.videos.results.map((video) => (
                    <CarouselItem key={video.id} className="relative">
                      <iframe
                        className="w-fit md:w-full h-[300px] md:h-[500px] rounded"
                        title={video.name}
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allow="fullscreen"
                      />
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
        <DialogContent className="max-w-[80%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Watch {movieData.title} Trailer</DialogTitle>
          </DialogHeader>
          {movieData?.videos?.results?.length > 0 ? (
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
