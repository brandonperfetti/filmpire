import { Button } from "@/components/ui/button";
import { MovieDetailsProps, UserProps } from "@/types";
import {
  ArrowLeft,
  Clapperboard,
  Film,
  Globe,
  Heart,
  Image,
  Minus,
  Plus,
  Video,
  Wallpaper,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MovieButtonsProps {
  user: UserProps;
  movieData: MovieDetailsProps;
  isMovieFavorited: boolean;
  isMovieWatchlisted: boolean;
  addToFavorites: () => void;
  addToWatchlist: () => void;
  setIsTrailerDialogOpen: (open: boolean) => void;
  setIsVideosDialogOpen: (open: boolean) => void;
  setIsPostersDialogOpen: (open: boolean) => void;
  setIsBackdropsDialogOpen: (open: boolean) => void;
}

const MovieButtons = ({
  user,
  movieData,
  isMovieFavorited,
  isMovieWatchlisted,
  addToFavorites,
  addToWatchlist,
  setIsTrailerDialogOpen,
  setIsVideosDialogOpen,
  setIsPostersDialogOpen,
  setIsBackdropsDialogOpen,
}: MovieButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid xl:flex gap-4 flex-wrap">
      <div className="space-y-4 md:space-y-0 md:flex flex-wrap gap-2">
        <Link to={movieData?.homepage || ""}>
          <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
            <Globe color="red" className="mr-2 size-4" />
            Website
          </Button>
        </Link>
        <Link to={`https://imdb.com/title/${movieData?.imdb_id}`}>
          <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
            <Clapperboard color="red" className="mr-2 size-4" />
            IMDB
          </Button>
        </Link>
        {movieData.external_ids.facebook_id && (
          <Link
            to={`https://facebook.com/${movieData.external_ids.facebook_id}`}
          >
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="#D60A17"
              >
                <path d="M22.675 0h-21.35c-.731 0-1.325.595-1.325 1.326v21.348c0 .731.594 1.326 1.325 1.326h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.896-4.788 4.666-4.788 1.325 0 2.465.099 2.797.143v3.241h-1.918c-1.503 0-1.794.714-1.794 1.762v2.313h3.587l-.467 3.622h-3.12v9.294h6.115c.73 0 1.324-.595 1.324-1.326v-21.348c0-.731-.594-1.326-1.325-1.326z" />
              </svg>
              Facebook
            </Button>
          </Link>
        )}
        {movieData.external_ids.instagram_id && (
          <Link
            to={`https://instagram.com/${movieData.external_ids.instagram_id}`}
          >
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="#D60A17"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.243 1.322 3.608.058 1.266.07 1.647.07 4.837s-.012 3.571-.07 4.837c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.243 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.243-1.322-3.608-.058-1.266-.07-1.647-.07-4.837s.012-3.571.07-4.837c.062-1.366.347-2.633 1.322-3.608.975-.975 2.243-1.26 3.608-1.322 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.67.013-4.947.072-1.518.067-2.944.407-4.043 1.506-1.099 1.099-1.439 2.525-1.506 4.043-.059 1.277-.072 1.688-.072 4.947s.013 3.67.072 4.947c.067 1.518.407 2.944 1.506 4.043 1.099 1.099 2.525 1.439 4.043 1.506 1.277.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.518-.067 2.944-.407 4.043-1.506 1.099-1.099 1.439-2.525 1.506-4.043.059-1.277.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.067-1.518-.407-2.944-1.506-4.043-1.099-1.099-2.525-1.439-4.043-1.506-1.277-.059-1.688-.072-4.947-.072z" />
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
              </svg>
              Instagram
            </Button>
          </Link>
        )}
        {movieData.external_ids.twitter_id && (
          <Link to={`https://twitter.com/${movieData.external_ids.twitter_id}`}>
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="#D60A17"
              >
                <path d="M24 4.557c-.883.392-1.83.656-2.825.775 1.014-.608 1.794-1.572 2.163-2.724-.949.564-2.003.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.923 0 .386.044.762.128 1.124-4.09-.205-7.713-2.165-10.141-5.144-.424.729-.667 1.577-.667 2.482 0 1.71.87 3.213 2.19 4.098-.807-.026-1.567-.247-2.229-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.171-1.296.171-.318 0-.626-.031-.928-.089.627 1.956 2.445 3.379 4.6 3.42-1.685 1.32-3.808 2.106-6.115 2.106-.397 0-.788-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.058 0 14.01-7.504 14.01-14.009 0-.213-.005-.425-.015-.636.964-.697 1.8-1.562 2.462-2.549z" />
              </svg>
              Twitter
            </Button>
          </Link>
        )}
        <Button
          variant="outline"
          onClick={() => setIsTrailerDialogOpen(true)}
          className="w-full md:w-auto"
        >
          <Film color="red" className="mr-2 size-4" /> Trailer
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsVideosDialogOpen(true)}
          className="w-full md:w-auto"
        >
          <Video color="red" className="mr-2 size-4" /> Videos
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsPostersDialogOpen(true)}
          className="w-full md:w-auto"
        >
          <Image color="red" className="mr-2 size-4" /> Posters
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsBackdropsDialogOpen(true)}
          className="w-full md:w-auto  hidden lg:flex"
        >
          <Wallpaper color="red" className="mr-2 size-4" /> Wallpapers
        </Button>
      </div>
      {user && (
        <div className="space-y-4 md:space-y-0 md:flex md:space-x-2 ">
          <Button
            variant={isMovieFavorited ? "destructive" : "outline"}
            onClick={addToFavorites}
            className="w-full md:w-auto"
          >
            <Heart
              color={isMovieFavorited ? "white" : "red"}
              className="mr-2 size-4"
            />
            {isMovieFavorited ? "Unfavorite" : "Add to Favorites"}
          </Button>
          <Button
            variant={isMovieWatchlisted ? "destructive" : "outline"}
            onClick={addToWatchlist}
            className="w-full md:w-auto"
          >
            {isMovieWatchlisted ? (
              <Minus color={"white"} className="mr-2 size-4" />
            ) : (
              <Plus color={"red"} className="mr-2 size-4" />
            )}
            Watchlist
          </Button>
        </div>
      )}
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="w-full md:w-auto"
      >
        <ArrowLeft color={"red"} className="mr-2 size-4" /> Back
      </Button>
    </div>
  );
};

export default MovieButtons;
