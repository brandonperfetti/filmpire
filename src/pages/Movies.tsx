import { RootState } from "@/app/store";
import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import { getLabelOrGenreName } from "@/lib/utils";
import { useGetGenresQuery, useGetMoviesQuery } from "@/services/TMDB";
import { useState } from "react";
import { useSelector } from "react-redux";

const MoviesPage = () => {
  const [page, setPage] = useState(1);

  const searchQuery = useSelector(
    (state: RootState) => state.currentGenreOrCategory.searchQuery,
  );
  const genreIdOrCategoryName = useSelector(
    (state: RootState) => state.currentGenreOrCategory.genreIdOrCategoryName,
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  const {
    data: genreData,
    error: genreError,
    isFetching: isFetchingGenre,
  } = useGetGenresQuery();

  const labelOrGenreName = getLabelOrGenreName(
    genreIdOrCategoryName,
    genreData?.genres || [],
  );

  if (isFetching || isFetchingGenre)
    return <div className="flex justify-center items-center ">Loading...</div>;

  if (!data?.results.length)
    return (
      <div className="flex flex-col items-center justify-center">
        <h4 className="h3-semibold mb-2 text-dark100_light900">
          No movies found
        </h4>
        <p className="paragraph-regular text-dark300_light700">
          Please search for something else
        </p>
      </div>
    );

  if (error || genreError)
    return (
      <div className="flex justify-center items-center">
        <p className="text-dark300_light700">
          An error occurred. Please try again later.
        </p>
      </div>
    );

  return (
    <>
      {labelOrGenreName ? (
        <h1 className="h1-bold mb-8 text-dark100_light900">
          {labelOrGenreName} Films
        </h1>
      ) : (
        <h1 className="h1-bold mb-8 text-dark100_light900">Popular Films</h1>
      )}
      <div className="background-light900_dark200 md:p-6 rounded-lg shadow-light100_dark100">
        <MovieList movies={data} />
        <div className="mt-4 md:mt-0">
          <Pagination
            pageNumber={page}
            setPage={setPage}
            totalPages={data.total_pages}
          />
        </div>
      </div>
    </>
  );
};

export default MoviesPage;
