import { RootState } from "@/app/store";
import { categories } from "@/constants";
import { selectGenreOrCategory, setPage } from "@/features/currentGenreOrCategory";
import { useGetGenresQuery } from "@/services/TMDB";
import { GenreProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import genreIcons from "./../../../public/assets/icons/genres";

const LeftSidebar = () => {
  const genreIdOrCategoryName = useSelector(
    (state: RootState) => state.currentGenreOrCategory.genreIdOrCategoryName,
  );

  const { data, error, isFetching } = useGetGenresQuery();

  const dispatch = useDispatch();

  if (isFetching) return <div className="flex justify-center">Loading...</div>;

  if (!data?.genres.length)
    return (
      <div>
        <h4>No genres found</h4>
      </div>
    );

  if (error) return <div>An error occurred</div>;

  const handleClick = (value: string | number) => {
    dispatch(selectGenreOrCategory(value));
    dispatch(setPage(1));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-dvh flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex flex-1 flex-col gap-6">
          <Separator className="-mt-9" />
          <div className="mx-auto lg:mx-0 h3-bold">Categories</div>
          {categories.map((category) => {
            const isActive = genreIdOrCategoryName === category.value;
            return (
              <Link
                to={"/"}
                onClick={() => handleClick(category.value)}
                key={category.label}
                className={`${
                  isActive
                    ? "primary-gradient text-light-900"
                    : "text-dark300_light900"
                }  flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg`}
              >
                <img
                  src={category.icon}
                  alt={category.label}
                  width={20}
                  height={20}
                  className={`${
                    isActive ? "" : "invert-colors"
                  } sm:mx-auto lg:mx-0`}
                />

                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {category.label}
                </p>
              </Link>
            );
          })}
          <Separator />
          <div className="mx-auto lg:mx-0 h3-bold">Genres</div>
          {data.genres.map((genre: GenreProps) => {
            const isActive = genreIdOrCategoryName === (genre.id as unknown);

            return (
              <Link
                to={"/"}
                onClick={() => {
                  dispatch(selectGenreOrCategory(genre.id));
                  window.scrollTo(0, 0);
                }}
                key={genre.id}
                className={`${
                  isActive
                    ? "primary-gradient text-light-900"
                    : "text-dark300_light900"
                }  flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg`}
              >
                <img
                  src={
                    genreIcons[
                      genre.name.toLowerCase() as keyof typeof genreIcons
                    ]
                  }
                  alt={
                    genreIcons[
                      genre.name.toLowerCase() as keyof typeof genreIcons
                    ]
                  }
                  width={20}
                  height={20}
                  className={`${
                    isActive ? "" : "invert-colors"
                  } sm:mx-auto lg:mx-0`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {genre.name}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default LeftSidebar;
