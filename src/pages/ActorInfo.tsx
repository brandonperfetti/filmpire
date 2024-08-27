import MovieList from "@/components/shared/MovieList";
import Pagination from "@/components/shared/Pagination";
import ActorInfoPageSkeleton from "@/components/skeletons/ActorInfoPageSkeleton";
import { Button } from "@/components/ui/button";
import {
  getAge,
  getPrettyDate,
  navbarHeight,
  scrollToElement,
} from "@/lib/utils";
import { useGetMoviesByActorQuery, useGetPersonQuery } from "@/services/TMDB";
import { ArrowLeft, Clapperboard, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ActorInfoPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: actorData, isFetching, isError } = useGetPersonQuery(id || "");

  // console.log("Actor Data", actorData);

  const { data: moviesByActorData } = useGetMoviesByActorQuery({
    id: id || '',
    page,
  });
  // console.log("Movies by Actor Data", moviesByActorData);

  const topMoviesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topMoviesRef.current) {
      scrollToElement(topMoviesRef, navbarHeight);
    }
  }, [page]);

  if (isFetching) return <ActorInfoPageSkeleton />;
  if (isError)
    return (
      <Button onClick={() => navigate(-1)}>
        Something Has Gone Wrong, Go Back
      </Button>
    );

  const actorAge = getAge(actorData?.birthday || "", actorData?.deathday || "");

  return (
    <div className="background-light900_dark200 p-2 md:p-6 rounded-lg shadow-light100_dark100">
      <div className="grid justify-around grid-cols-1 md:grid-cols-3">
        <div>
          <img
            src={
              actorData?.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actorData?.profile_path}`
                : "/assets/images/actor-placeholder.webp"
            }
            alt={actorData?.name}
            className="rounded-2xl shadow-2xl sm:my-0 mx-auto md:mx-0 h-auto md:w-[80%]"
          />
        </div>
        <div className="grid col-span-2">
          <div className="my-4 md:my-0">
            <h3 className="h1-bold mb-2 text-center">{actorData?.name}</h3>
            {actorData?.birthday && (
              <>
                <p className="text-center base-medium text-dark300_light900">
                  Born {getPrettyDate(actorData?.birthday || "")}
                </p>
                {actorData?.place_of_birth && (
                  <p className="text-center base-medium text-dark300_light900">
                    {actorData?.place_of_birth}
                  </p>
                )}
                {actorData.deathday && (
                  <p className="text-center base-medium text-dark300_light900">
                    Died {getPrettyDate(actorData?.deathday || "")}
                  </p>
                )}
                <p className="text-center text-dark400_light800">
                  {actorAge} years old
                </p>
              </>
            )}
            {actorData?.biography && (
              <>
                <h5 className="mt-3 h3-semibold text-dark100_light900">
                  Biography
                </h5>
                <p className="my-6 p-4 paragraph-regular text-dark400_light800">
                  {actorData.biography}
                </p>
              </>
            )}

            <div className="flex w-full items-center justify-center gap-2 mt-2">
              {actorData?.homepage && (
                <Link to={actorData?.homepage || ""}>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto my-2 md:my-0"
                  >
                    <Globe color="red" className="mr-2 size-4" />
                    Website
                  </Button>
                </Link>
              )}
              <Link to={`https://imdb.com/name/${actorData?.imdb_id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <Clapperboard color="red" className="mr-2" />
                  IMDB
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft color="red" className="mr-2" /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 md:mt-12 w-full" ref={topMoviesRef}>
        <h3 className="h3-semibold text-dark100_light900"> Top Movies</h3>
        {moviesByActorData ? (
          <div className="my-6">
            <MovieList movies={moviesByActorData } numberOfMovies={12} />
          </div>
        ) : (
          <p className="text-dark400_light800">Sorry, nothing was found</p>
        )}
        <Pagination
          pageNumber={page}
          setPage={setPage}
          totalPages={moviesByActorData?.total_pages || 1}
        />
      </div>
    </div>
  );
};

export default ActorInfoPage;
