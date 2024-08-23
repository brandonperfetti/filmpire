import { Skeleton } from "@/components/ui/skeleton";

const MovieInfoPageSkeleton = () => {
  return (
    <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100">
      <div className="grid justify-around grid-cols-1 md:grid-cols-3">
        <div>
          <Skeleton className="rounded-2xl shadow-2xl md:w-[80%] w-full h-[450px]" />
        </div>
        <div className="grid col-span-2">
          <div className="my-4 md:my-0">
            <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-5 w-1/2 mx-auto mb-4" />
            <div className="flex justify-center items-center flex-wrap gap-4">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex my-3 max-w-fit mx-auto space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-6 w-1/3 mt-6 mx-auto" />
            <Skeleton className="h-16 w-full mt-4 mx-auto" />
            <Skeleton className="h-6 w-1/3 mt-6 mx-auto" />
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-4 my-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-lg shadow-2xl h-40 w-28 mx-auto"
                />
              ))}
            </div>
            <div className="grid xl:flex gap-4">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 md:mt-12 w-full">
        <Skeleton className="h-6 w-1/4 mb-4 mx-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 my-6">
          {[...Array(12)].map((_, index) => (
            <Skeleton
              key={index}
              className="rounded-lg shadow-2xl h-40 w-full mx-auto"
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Skeleton className="h-10 w-20 mx-2" />
          <Skeleton className="h-10 w-20 mx-2" />
        </div>
      </div>
    </div>
  );
};

export default MovieInfoPageSkeleton;
