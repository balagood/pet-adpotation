import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePet } from "../slices/petSlice";
import { addPet } from "../api/petService";
import { addFav, removeFav, fetchFavorites } from "../slices/favoriteSlice";
import { useNavigate } from "react-router-dom";

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
      .then(() => dispatch(fetchFavorites(user._id)));
  } else {
    dispatch(addFav({ userId: user._id, petId: pet._id }))
      .then(() => dispatch(fetchFavorites(user._id)));
  }
};

  /* const handleUpdate = () => {
    const updatedData = {
      ...pet,
      status: "Adopted",
    };

    dispatch(updatePet({
      id: pet._id,
      petData: updatedData
    }));
  }; */

  const handleEdit = () => {
    navigate(`/editPet/${pet._id}`);
  };
  
  return (
    <div className="bg-white shadow rounded p-4 pet-card">

      {pet.photos && pet.photos.length > 0 && (
        <div className="space-y-2">
          {pet.photos.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:3000${url}`}
              alt={pet.name}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      )}

      <h2 className="text-lg font-bold mt-2">{pet.name}</h2>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age} years</p>
      <p>Size: {pet.size}</p>
      <p>Status: {pet.status}</p>

      <button onClick={handleEdit} className="mt-2 px-4 py-2 bg-green-500 text-white rounded ml-2">Edit</button>
      <button onClick={() => navigate(`/pet/${pet._id}`)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded ml-2">View Details</button>
      {user?.role === "adopter" && (<button onClick={handleFavorite} className={`mt-3 px-4 py-2 rounded text-white transition ml-2 ${isFav? "bg-red-500 hover:bg-red-600": "bg-green-500 hover:bg-green-600"}`}>
    {isFav ? "Saved" : "Save"}</button>)}
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