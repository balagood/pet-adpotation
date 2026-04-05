import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites,removeFav } from "../slices/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favs = useSelector((state) => state.favorites.list || []);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavorites(user._id));
    }
  }, [user,dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Favorites</h2>
      {favs.length === 0 && <p className="text-gray-500 text-center">No favorites yet</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favs.map((f) => (
          <div key={f._id} onClick={() => navigate(`/pet/${f.petId._id}`)} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer">
            {(<img src={f.petId?.photos?.[0] ? `${BASE_URL}/${f.petId.photos[0]}` : "/no-image.png"}alt={f.petId.name}className="w-full h-48 object-cover rounded"/>)}
            <h3 className="text-lg font-bold mt-3" >{f.petId?.name}</h3>
            <p className="text-gray-600">{f.petId?.breed}</p>
            <button onClick={(e) =>{e.stopPropagation();dispatch(removeFav({ userId: user._id, petId: f.petId._id }))}}className="text-red-500 mt-2">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
//old code comment
/*{f.petId?.photos?.length > 0 && (<img src={`${BASE_URL}/${f.petId.photos[0]}`:"/no-image.png"}alt={f.petId.name}className="w-full h-48 object-cover rounded"/>)}
*/
}
