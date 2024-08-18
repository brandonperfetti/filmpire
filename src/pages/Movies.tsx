import { RootState } from "@/app/store";
import MovieList from "@/components/shared/MovieList";
import { useGetMoviesQuery } from "@/services/TMDB";
import { useState } from "react";
import { useSelector } from "react-redux";

const MoviesPage = () => {
  const [page, setpage] = useState(1);

  const genreIdOrCategoryName = useSelector(
    (state: RootState) => state.currentGenreOrCategory.genreIdOrCategoryName,
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
  });

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
      <h1>{genreIdOrCategoryName}</h1>
      <MovieList movies={data} />
    </div>
  );
};

export default MoviesPage;
