import { CastMemberProps } from "@/types";
import { Link } from "react-router-dom";

interface TopCastProps {
  cast: CastMemberProps[];
}

const TopCast: React.FC<TopCastProps> = ({ cast }) => {
  return (
    <div>
      <h5 className="h3-semibold mt-6 text-dark100_light900">Top cast</h5>
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4 my-6 p-4 overflow-auto">
        {cast.slice(0, 6).map((castMember, index) => {
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
      </div>
    </div>
  );
};

export default TopCast;
