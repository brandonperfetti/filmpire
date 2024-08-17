import MovieList from "@/components/shared/MovieList";
import { useGetMoviesQuery } from "@/services/TMDB";

const type = "movie/popular"; // Or any other type like 'movie/top_rated'
const page = 1;

const MoviesPage = () => {
  const { data, error, isFetching } = useGetMoviesQuery({ type, page });
  console.log("Movie Data", data);

  if (isFetching) return <div className="flex justify-center">Loading...</div>;

  if (!data.results.length)
    return (
      <div className="flex align-bottom">
        <h4>No movies found</h4>
        <p>Please search for something else</p>
      </div>
    );

  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default MoviesPage;
