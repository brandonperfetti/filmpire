import { userSelector } from "@/features/auth";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);

  const favoriteMovies = [];
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="mb-2 h3-bold">My Profile</h3>
      </div>
      {!favoriteMovies.length ? (
        <p>Add favorites or watchlist some movies to see theme here!</p>
      ) : (
        <div>FAVORITE MOVIES</div>
      )}
      <h4> {user?.username}</h4>
    </div>
  );
};

export default ProfilePage;
