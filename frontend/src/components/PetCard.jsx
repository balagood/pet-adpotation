import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav} from "../slices/favoriteSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

const PetCard = ({ pet }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user =useSelector((state)=>state.user.user)
  const favorites = useSelector((state) => state.favorites?.list || []);
  const isFav = favorites.some((f) => f.petId?._id === pet._id);
  const handleFavorite = () => {
  if (!user) return;

  if (isFav) {
    dispatch(removeFav({ userId: user._id, petId: pet._id }))
      //.then(() => dispatch(fetchFavorites(user._id)));
  } else {
    dispatch(addFav({ userId: user._id, petId: pet._id }))
      //.then(() => dispatch(fetchFavorites(user._id)));
  }
};

  const handleEdit = () => {
    navigate(`/editPet/${pet._id}`);
  };

   const handleViewDetails = () => {
    // If not login -> go login page
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // If login -> open pet details page
    navigate(`/pet/${pet._id}`);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">

     <img src={pet.photos?.[0] || "/no-image.png"}alt={pet.name}className="w-full h-48 object-cover rounded"/>

      <h2 className="text-lg font-bold mt-2">{pet.name}</h2>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age} years</p>
      <p>Size: {pet.size}</p>
      <p>Status: {pet.status}</p>
      {/*<div className="flex gap-2 mt-3">
        <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button> 
        <button onClick={handleViewDetails => navigate(`/pet/${pet._id}`)} className="px-3 py-1 bg-gray-500 text-white rounded">View Details</button>
        {user?.role === "adopter" && (<button onClick={handleFavorite} className={`px-3 py-1 rounded text-white transition ml-2 ${isFav? "bg-red-500 hover:bg-red-600": "bg-green-500 hover:bg-green-600"}`}>{isFav ? "Saved" : "Save"}</button>)}
      </div>*/}

      <div className="flex flex-wrap gap-2 mt-4">

          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </button>

          {user?.role === "adopter" && (
            <button
              onClick={handleFavorite}
              className={`px-4 py-2 rounded-lg text-white transition ${
                isFav
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isFav ? "Saved" : "Save"}
            </button>
          )}

          {user?.role === "shelter" && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Edit
            </button>
          )}

        </div>  

      
      {/* <button onClick={handleUpdate} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Mark as Adopted</button> */}

    </div>
  );
};


//this code previously added the upate pet functionality
/*  const PetCard = ({ pet }) => ( 
  <div className="bg-white shadow rounded p-4 pet-card">
    {pet.photos && pet.photos.length > 0 && (
        <div className="space-y-2">
          {pet.photos.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:3000${url}`} // prepend backend host
              alt={pet.name}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
    )}
    <img src={pet.photoUrl} alt={pet.name} /> 
    <h2 className="text-lg font-bold mt-2">{pet.name}</h2>
    <p>Breed: {pet.breed}</p>
    <p>Age: {pet.age} years</p>
    <p>Size: {pet.size}</p>
    <p>Status: {pet.status}</p>
     <button
        onClick={handleUpdate}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Mark as Adopted
      </button>
    <button>View Details</button>  
  </div>
); */ 

export default PetCard;