import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites,removeFav } from "../slices/favoriteSlice";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favs = useSelector((state) => state.favorites.list || []);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavorites(user._id));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Favorites</h2>

      {favs.length === 0 && <p>No favorites yet</p>}
      {favs.map((f) => (
        <div key={f._id}>
          {f.petId?.name}
          <button
  onClick={() =>
    dispatch(removeFav({ userId: user._id, petId: f.petId._id }))
  }
  className="text-red-500"
>
  Remove
</button>
        </div>
      ))}
      
    </div>
  );
}