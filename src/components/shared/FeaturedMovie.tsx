import { MovieProps } from "@/types";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieProps;
}
const FeaturedMovie = ({ movie }: Props) => {
  if (!movie) return null;

  return (
    <div className="relative h-[490px] mb-2 md:mb-6 flex justify-center">
      <Link to={`/movies/${movie.id}`} className="no-underline w-full h-full">
        <div className="w-full h-full flex justify-end flex-col">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
        </div>
        {/* Overlay text */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <p className="text-sm mt-2 max-w-lg">{movie.overview}</p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedMovie;
