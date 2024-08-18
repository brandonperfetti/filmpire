import { categories } from "@/constants";
import { useGetGenresQuery } from "@/services/TMDB";
import { GenreProps } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import genreIcons from "./../../../public/assets/icons/genres";

const LeftSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { data, error, isFetching } = useGetGenresQuery();
  console.log("Genre Data", data);

  if (isFetching) return <div className="flex justify-center">Loading...</div>;

  if (!data?.genres.length)
    return (
      <div className="flex align-bottom">
        <h4>No movies found</h4>
        <p>Please search for something else</p>
      </div>
    );

  if (error) return <div>An error occurred</div>;

  return (
    <>
      <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-dvh flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex flex-1 flex-col gap-6">
          <Separator className="-mt-9" />
          <div className="mx-auto lg:mx-0">Categories</div>
          {categories.map((category) => {
            const isActive =
              (pathname.includes(category.route) &&
                category.route.length > 1) ||
              pathname === category.route;
            return (
              <Link
                to={category.route}
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
          <div className="mx-auto lg:mx-0">Genres</div>
          {data.genres.map(({ name, id }: GenreProps) => {
            // const isActive =
            //   (pathname.includes(item.route) && item.route.length > 1) ||
            //   pathname === item.route;

            return (
              <Link
                to={"/"}
                key={id}
                className="flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg"
                // className={`${
                //   isActive
                //     ? "primary-gradient text-light-900"
                //     : "text-dark300_light900"
                // }  flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg`}
              >
                <img
                  src={
                    genreIcons[name.toLowerCase() as keyof typeof genreIcons]
                  }
                  alt={
                    genreIcons[name.toLowerCase() as keyof typeof genreIcons]
                  }
                  width={20}
                  height={20}
                  className="sm:mx-auto lg:mx-0"
                  // className={`${
                  //   isActive ? "" : "invert-colors"
                  // } sm:mx-auto lg:mx-0`}
                />
                <p
                  className=" max-lg:hidden"
                  // className={`${
                  //   isActive ? "base-bold" : "base-medium"
                  // } max-lg:hidden`}
                >
                  {name}
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
