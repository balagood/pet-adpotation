import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFav } from "../slices/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { list: favs, loading } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavorites(user._id));
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading favorites...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Favorite Pets</h2>
        <span className="text-gray-500">
          {favs.length} saved
        </span>
      </div>

      {favs.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-600">
            No favorites yet
          </h3>
          <p className="text-gray-400 mt-2">
            Start adding pets to your favorites
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favs.map((f) => {
          if (!f.petId) return null;

          const pet = f.petId;

          return (
            <div
              key={f._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/pet/${pet._id}`)}
              >
                <img
                  src={pet.photos?.[0] || "/no-image.png"}
                  alt={pet.name}
                  className="w-full h-52 object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{pet.name}</h3>
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                    Favorite
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  {pet.breed}
                </p>

                {pet.age && (
                  <p className="text-sm text-gray-500">
                    Age: {pet.age}
                  </p>
                )}

                {pet.location && (
                  <p className="text-sm text-gray-500">
                    Location: {pet.location}
                  </p>
                )}

                {pet.description && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {pet.description}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/pet/${pet._id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        removeFav({
                          userId: user._id,
                          petId: pet._id,
                        })
                      );
                    }}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}