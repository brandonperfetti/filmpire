import { MovieListProps } from "@/types";
import Movie from "./Movie";

const MovieList = ({
  movies,
  numberOfMovies,
  excludeFirst,
}: MovieListProps) => {
  const hasBackdrop = movies.results[0]?.backdrop_path;
  const startFrom = hasBackdrop && excludeFirst ? 1 : 0;
  return (
    <ul
      role="list"
      className="background-light900_dark200 p-2 md:p-4 rounded-lg grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full"
    >
      {movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </ul>
  );
};

export default MovieList;
