import genreIcons from "@/assets/icons/genres";
import MovieList from "@/components/shared/MovieList";
import Rating from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/useTheme";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import { useGetMovieQuery, useGetRecommendationsQuery } from "@/services/TMDB";
import { MovieDetailsProps } from "@/types";
import {
  ArrowLeft,
  Clapperboard,
  Film,
  Globe,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const MovieInfoPage = () => {
  const { id } = useParams();

  const { data, isFetching, isError } = useGetMovieQuery(id);

  console.log("Movie Data", data);

  const movieData = data as MovieDetailsProps;
  const { mode } = useTheme();

  console.log("Mode", mode);

  const dispatch = useDispatch();

  const {
    data: recommendationsData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching: isRecommendationsFetching,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isRecommendationsError,
  } = useGetRecommendationsQuery(id); // Only pass `id`

  console.log("Recomendations Data", recommendationsData);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <Link to={"/"}>Something Has Gone Wrong, Go Home</Link>;

  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

  const addToFavorites = () => {
    console.log("Added to favorites");
  };

  const addToWatchlist = () => {
    console.log("Added to watch list");
  };

  return (
    <div className="grid">
      <div className="grid justify-around my-3 grid-cols-1 md:grid-cols-3">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`}
            alt={data?.title}
            className="rounded-2xl shadow-2xl sm:my-0 mx-auto md:mx-0 h-auto md:w-[80%]"
          />
        </div>
        <div className="grid col-span-2">
          <div className="my-4 md:my-0">
            <h3 className="h3-bold mb-2 text-center">
              {movieData?.title} ( {movieData?.release_date.split("-")[0]} )
            </h3>
            <h5 className="mb-2 text-center">{movieData?.tagline}</h5>
            <div className="flex justify-center flex-wrap">
              <Rating value={movieData?.vote_average / 2} precision={0.1} />
              <p className="pr-4 pl-2">
                {(movieData?.vote_average / 2).toFixed(2)} / 5{" "}
              </p>
              <div className="flex justify-center">
                {movieData?.runtime} min /{" "}
                {movieData?.spoken_languages.length > 0
                  ? movieData?.spoken_languages[0].english_name
                  : ""}
              </div>
            </div>
            <div className="flex my-3 max-w-md mx-auto">
              {movieData?.genres.map((genre) => (
                <Link
                  className="mx-auto flex flex-wrap justify-around"
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
                      mode === "light" ? "" : "invert-colors"
                    } ml-3 mr-2`}
                  />
                  <p className="md:mr-2">{genre.name}</p>
                </Link>
              ))}
            </div>
            <h5 className="mt-3">Overview</h5>
            <p className="my-6">{movieData.overview}</p>
            <h5 className="mt-3">Top cast</h5>
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
                          src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                          alt={castMember.name}
                          className="rounded-lg shadow-2xl h-40 w-28 md:hover:scale-105"
                        />
                        <p className="text-center">{castMember.name}</p>
                        <p className="text-center">
                          {castMember.character.split("/")[0]}
                        </p>
                      </Link>
                    );
                  })
                  .slice(0, 6)}
            </div>
            <div className="grid mt-2">
              <div className="grid xl:flex gap-3">
                <div className="grid">
                  <div className="space-x-2">
                    <Link to={movieData?.homepage || ""}>
                      <Button variant="outline">
                        {" "}
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
                    <Button variant="outline" onClick={() => {}}>
                      <Film color="red" className="mr-2 size-4" /> Trailer
                    </Button>
                  </div>
                </div>
                <div className="grid">
                  <div className="space-x-2">
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
                    <Link to={"/"}>
                      <Button variant="outline" onClick={() => {}}>
                        <ArrowLeft color={"red"} className="mr-2 size-4" /> Back
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full">
        <h3>You might also like</h3>
        {recommendationsData ? (
          <div className="my-6">
            <MovieList movies={recommendationsData} numberOfMovies={12} />
          </div>
        ) : (
          <p>Sorry, nothing was found</p>
        )}
      </div>
    </div>
  );
};

export default MovieInfoPage;
