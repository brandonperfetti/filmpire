import { MovieListProps } from "@/types";
import Movie from "./Movie";

const MovieList = ({ movies, numberOfMovies }: MovieListProps) => {
  return (
    <ul
      role="list"
      className="background-light900_dark200 md:p-4 rounded-lg grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full"
    >
      {movies.results.slice(0, numberOfMovies).map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </ul>
  );
};

export default MovieList;
