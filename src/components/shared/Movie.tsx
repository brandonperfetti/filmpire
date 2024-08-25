import { MovieProps } from "@/types";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Rating from "./Rating";

interface Props {
  movie: MovieProps;
  index: number;
}

const Movie = ({ movie, index }: Props) => {
  const delay = `${index * 250}ms`;
  return (
    <div
      className="animate-grow opacity-0 md:p-4 rounded-lg"
      style={{ animationDelay: delay }}
    >
      <Link to={`/movies/${movie.id}`}>
        <img
          alt={movie.title}
          className="rounded-lg lg:h-[300px] mb-4 md:hover:scale-105 mx-auto"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/assets/images/movie-placeholder.webp"
          }
        ></img>
        <p className="overflow-auto mb-1">{movie.title}</p>
        <Tooltip>
          <TooltipTrigger>
            <Rating value={movie?.vote_average / 2} precision={0.1} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{(movie?.vote_average / 2).toFixed(2)} / 5 Stars</p>
          </TooltipContent>
        </Tooltip>
      </Link>
    </div>
  );
};

export default Movie;
