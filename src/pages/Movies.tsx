import { useGetMoviesQuery } from "@/services/TMDB";

const type = "movie/popular"; // Or any other type like 'movie/top_rated'
  const page = 1;

const MoviesPage = () => {
  const { data } = useGetMoviesQuery({ type, page });
  console.log("Movie Data", data);
  return <div>MoviesPage</div>;
};

export default MoviesPage;
