import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import Rating from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/useTheme";
import { userSelector } from "@/features/auth";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { scrollToElement, tmdbApiKey } from "@/lib/utils";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "@/services/TMDB";
import { MovieDetailsProps, MovieProps } from "@/types";
import axios from "axios";
import {
  ArrowLeft,
  Clapperboard,
  Film,
  Globe,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import genreIcons from "./../../public/assets/icons/genres";
import MovieInfoPageSkeleton from "@/components/skeletons/MovieInfoPageSkeleton";

const MovieInfoPage = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [isPaginationTriggered, setIsPaginationTriggered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data, isFetching, isError } = useGetMovieQuery(id);

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

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find(
        (movie: MovieProps) => movie?.id === data?.id,
      ),
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find(
        (movie: MovieProps) => movie?.id === data?.id,
      ),
    );
  }, [watchlistMovies, data]);

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

  // console.log({ isMovieWatchlisted });

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

  // console.log("Movie Data", data);

  const movieData = data as MovieDetailsProps;
  const { mode } = useTheme();

  // console.log("Mode", mode);

  const dispatch = useDispatch();

  // console.log("Recomendations Data", recommendationsData);

  const topMoviesRef = useRef<HTMLDivElement>(null);

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

  if (isFetching || isRecommendationsFetching)
    return <MovieInfoPageSkeleton />;
  if (isError || isRecommendationsError)
    return <Link to={"/"}>Something Has Gone Wrong, Go Home</Link>;

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
                  ? movieData?.spoken_languages[0].english_name
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
            <h5 className="h3-semibold mt-6 text-dark100_light900">Overview</h5>
            <p className="my-6 paragraph-regular text-dark400_light800">
              {movieData.overview}
            </p>
            <h5 className=" h3-semibold mt-6 text-dark100_light900">
              Top cast
            </h5>
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-4 my-6">
              {movieData &&
                movieData.credits?.cast
                  ?.map((castMember, index) => {
                    const delay = `${index * 250}ms`;
                    return (
                      <Link
                        to={`/actors/${castMember.id}`}
                        key={castMember.id}
                        className="flex flex-col items-center animate-grow opacity-0"
                        style={{ animationDelay: delay }}
                      >
                        <img
                          src={
                            castMember.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`
                              : "/assets/images/actor-placeholder.webp"
                          }
                          alt={castMember.name}
                          className="rounded-lg shadow-2xl h-40 w-28 md:hover:scale-105 object-cover"
                        />
                        <p className="text-center overflow-auto mt-3 mb-1 text-dark100_light900">
                          {castMember.name}
                        </p>
                        <p className="text-center text-dark300_light700">
                          {castMember.character.split("/")[0]}
                        </p>
                      </Link>
                    );
                  })
                  .slice(0, 6)}
            </div>
            <div className="grid xl:flex gap-4">
              <div>
                <div className="space-x-2">
                  <Link to={movieData?.homepage || ""}>
                    <Button variant="outline">
                      <Globe color="red" className="mr-2 size-4" />
                      Website
                    </Button>
                  </Link>

                  <Link to={`https://imdb.com/title/${movieData?.imdb_id}`}>
                    <Button variant="outline">
                      <Clapperboard color="red" className="mr-2 size-4" />
                      IMDB
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Film color="red" className="mr-2 size-4" /> Trailer
                  </Button>
                </div>
              </div>
              <div className="grid">
                <div className="space-x-2 flex">
                  {user && (
                    <>
                      <Button
                        variant={isMovieFavorited ? "destructive" : "outline"}
                        onClick={addToFavorites}
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

                  <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft color={"red"} className="mr-2 size-4" /> Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {recommendationsData.results.length > 0 && (
        <div className="mt-5 md:mt-12 w-full" ref={topMoviesRef}>
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
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Watch {movieData.title} Trailer</DialogTitle>
          </DialogHeader>
          {movieData?.videos?.results?.length > 0 ? (
            <iframe
              className="w-full h-96 rounded"
              title="Trailer"
              src={`https://www.youtube.com/embed/${movieData?.videos?.results[0].key}?autoplay=1`}
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
