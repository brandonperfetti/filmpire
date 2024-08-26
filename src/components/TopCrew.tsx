import { CrewMemberProps } from "@/types";
import { Link } from "react-router-dom";

interface TopCrewProps {
  crew: CrewMemberProps[];
}

const TopCrew: React.FC<TopCrewProps> = ({ crew }) => {
  return (
    <div>
      <h5 className="h3-semibold mt-6 text-dark100_light900">Top crew</h5>
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4 my-6 p-4 overflow-auto">
        {crew.slice(0, 6).map((crewMember, index) => {
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
      </div>
    </div>
  );
};

export default TopCrew;
