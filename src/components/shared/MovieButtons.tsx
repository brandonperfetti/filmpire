import { MovieDetailsProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Clapperboard, Heart, Minus, Plus, Film, Video, Image, Wallpaper, ArrowLeft } from "lucide-react";

interface MovieButtonsProps {
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
          <Link to={`https://facebook.com/${movieData.external_ids.facebook_id}`}>
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              {/* Facebook SVG Icon */}
              Facebook
            </Button>
          </Link>
        )}
        {movieData.external_ids.instagram_id && (
          <Link to={`https://instagram.com/${movieData.external_ids.instagram_id}`}>
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              {/* Instagram SVG Icon */}
              Instagram
            </Button>
          </Link>
        )}
        {movieData.external_ids.twitter_id && (
          <Link to={`https://twitter.com/${movieData.external_ids.twitter_id}`}>
            <Button variant="outline" className="w-full md:w-auto my-2 md:my-0">
              {/* Twitter SVG Icon */}
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
          className="w-full md:w-auto"
        >
          <Wallpaper color="red" className="mr-2 size-4" /> Wallpapers
        </Button>
      </div>
      <div className="space-y-4 md:space-y-0 md:flex md:space-x-2 ">
        <Button
          variant={isMovieFavorited ? "destructive" : "outline"}
          onClick={addToFavorites}
          className="w-full md:w-auto"
        >
          <Heart color={isMovieFavorited ? "white" : "red"} className="mr-2 size-4" />
          {isMovieFavorited ? "Unfavorite" : "Add to Favorites"}
        </Button>
        <Button
          variant={isMovieWatchlisted ? "destructive" : "outline"}
          onClick={addToWatchlist}
          className="w-full md:w-auto"
        >
          {isMovieWatchlisted ? <Minus color={"white"} className="mr-2 size-4" /> : <Plus color={"red"} className="mr-2 size-4" />}
          Watchlist
        </Button>
      </div>
      <Button variant="outline" onClick={() => navigate(-1)} className="w-full md:w-auto">
        <ArrowLeft color={"red"} className="mr-2 size-4" /> Back
      </Button>
    </div>
  );
};

export default MovieButtons;
