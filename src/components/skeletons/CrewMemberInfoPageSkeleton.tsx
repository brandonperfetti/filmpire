import { Skeleton } from "@/components/ui/skeleton";

const CrewMemberInfoPageSkeleton = () => {
  return (
    <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100">
      <div className="grid justify-around grid-cols-1 md:grid-cols-3">
        {/* Crew Member Image Skeleton */}
        <div>
          <Skeleton className="rounded-2xl shadow-2xl h-[450px] w-[80%] mx-auto" />
        </div>
        <div className="grid col-span-2">
          <div className="my-4 md:my-0">
            {/* Crew Member Name Skeleton */}
            <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
            {/* Birthday and Age Skeleton */}
            <Skeleton className="h-5 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-5 w-1/4 mx-auto mb-4" />
            {/* Biography Title Skeleton */}
            <Skeleton className="h-6 w-1/3 mt-6 mx-auto" />
            {/* Biography Content Skeleton */}
            <Skeleton className="h-24 w-full mt-4 mx-auto" />
            {/* Buttons Skeleton */}
            <div className="flex w-full items-center justify-center gap-2 mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
      {/* Top Movies Skeleton */}
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

export default CrewMemberInfoPageSkeleton;
