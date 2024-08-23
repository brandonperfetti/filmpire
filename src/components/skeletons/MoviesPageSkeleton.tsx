import { Skeleton } from "@/components/ui/skeleton";

const MoviesPageSkeleton = () => {
  return (
    <>
      {/* Featured Movie Skeleton */}
      <div className="relative h-[490px] mb-3 md:mb-6 flex justify-center">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      {/* Movie List Skeleton */}
      <div className="background-light900_dark200 md:p-6 rounded-lg shadow-light100_dark100">
        <div className="grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full">
          {[...Array(12)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-[300px] rounded-lg mx-auto w-full"
            />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-4 md:mt-0 flex justify-center space-x-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </>
  );
};

export default MoviesPageSkeleton;
