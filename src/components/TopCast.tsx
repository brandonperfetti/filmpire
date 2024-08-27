import { CastMemberProps } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton"; // Adjust the path if necessary

interface TopCastProps {
  cast: CastMemberProps[];
}

const TopCast: React.FC<TopCastProps> = ({ cast }) => {
  const [castEnd, setCastEnd] = useState(6);
  const [loading, setLoading] = useState(false);

  const loadMoreCast = () => {
    setLoading(true);
    setTimeout(() => {
      setCastEnd(castEnd + 6);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  return (
    <div className="mb-8">
      <h5 className="h3-semibold mt-6 text-dark100_light900">Top cast</h5>
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4 my-2 p-4 overflow-auto">
        {cast.slice(0, castEnd).map((castMember, index) => {
          const delay = `${index * 250}ms`;
          return (
            <Link
              to={`/actors/${castMember.id}`}
              key={`cast_member_${castMember.id}`}
              className="flex flex-col items-center animate-grow opacity-0"
              style={{ animationDelay: delay }}
            >
              <img
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`
                    : "/assets/images/actor-placeholder.webp"
                }
                alt={castMember.name}
                className="rounded-lg shadow-2xl h-40 w-28 md:hover:scale-105 object-cover"
              />
              <p className="text-center overflow-auto mt-3 mb-1 text-dark100_light900">
                {castMember.name}
              </p>
              <p className="text-center text-dark300_light700 body-regular">
                {castMember.character.split("/")[0]}
              </p>
            </Link>
          );
        })}

        {loading &&
          // Render skeleton placeholders while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton_cast_${index}`}
              className="flex flex-col items-center"
            >
              <Skeleton className="h-40 w-28 rounded-lg" />
              <Skeleton className="h-4 w-24 mt-3 rounded" />
              <Skeleton className="h-4 w-16 mt-1 rounded" />
            </div>
          ))}
      </div>

      {castEnd < cast.length && !loading && (
        <Button variant="secondary" onClick={loadMoreCast}>
          Load more cast
        </Button>
      )}
    </div>
  );
};

export default TopCast;
