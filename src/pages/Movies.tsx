import { RootState } from "@/app/store";
import MovieList from "@/components/shared/MovieList";
import { getLabelOrGenreName } from "@/lib/utils";
import { useGetGenresQuery, useGetMoviesQuery } from "@/services/TMDB";
import { useSelector } from "react-redux";

const MoviesPage = () => {
  // const [page, setpage] = useState(1);
  const page = 1;

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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!data?.results.length)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
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
      <div className="flex justify-center items-center h-screen">
        <p className="text-dark300_light700">
          An error occurred. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="background-light900_dark200 p-6 rounded-lg shadow-light100_dark100">
      {labelOrGenreName && (
        <h1 className="h1-bold mb-8 text-dark100_light900">
          {labelOrGenreName} Films
        </h1>
      )}
      <MovieList movies={data} />
    </div>
  );
};

export default MoviesPage;
