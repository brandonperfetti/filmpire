import { CrewMemberProps } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton"; // Adjust the path if necessary

interface TopCrewProps {
  crew: CrewMemberProps[];
}

const TopCrew: React.FC<TopCrewProps> = ({ crew }) => {
  const [crewEnd, setCrewEnd] = useState(6);
  const [loading, setLoading] = useState(false);

  const loadMoreCrew = () => {
    setLoading(true);
    setTimeout(() => {
      setCrewEnd(crewEnd + 6);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  return (
    <div className="mb-8">
      <h5 className="h3-semibold mt-6 text-dark100_light900">Top crew</h5>
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4 my-2 p-4 overflow-auto">
        {crew.slice(0, crewEnd).map((crewMember, index) => {
          const delay = `${index * 250}ms`;
          return (
            <Link
              to={`/crew/${crewMember.id}`}
              key={`crew_member_${crewMember.id}`}
              className="flex flex-col items-center animate-grow opacity-0"
              style={{ animationDelay: delay }}
            >
              <img
                src={
                  crewMember.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${crewMember.profile_path}`
                    : "/assets/images/actor-placeholder.webp"
                }
                alt={crewMember.name}
                className="rounded-lg shadow-2xl h-40 w-28 md:hover:scale-105 object-cover"
              />
              <p className="text-center overflow-auto mt-3 mb-1 text-dark100_light900">
                {crewMember.name}
              </p>
              <p className="text-center text-dark300_light700 body-regular">
                {crewMember.job}
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

      {crewEnd < crew.length && !loading && (
        <Button variant="secondary" onClick={loadMoreCrew}>
          Load more crew
        </Button>
      )}
    </div>
  );
};

export default TopCrew;
