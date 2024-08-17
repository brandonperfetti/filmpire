import { MovieProps } from "@/types";

interface Props {
  movie: MovieProps;
  index: number;
}

const Movie = ({ movie, index }: Props) => {
  return <div className="grid">{movie.title}</div>;
};

export default Movie;
