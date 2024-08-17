import { MovieListProps } from "@/types";
import Movie from "./Movie";

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {movies.results.map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </ul>
  );
};

export default MovieList;
