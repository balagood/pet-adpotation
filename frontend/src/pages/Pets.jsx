import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../slices/petSlice";
import PetCard from "../components/PetCard";

const Pets = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.pets);

  const [filters, setFilters] = useState({});
  

  useEffect(() => {
    const timeout = setTimeout(() => {
    dispatch(fetchPets(filters));
  }, 400);
    //dispatch(fetchPets(filters)); // fetch with filters
  }, [dispatch, filters]);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Pets</h2>

      {/* Filter Form */}
      <div className="mb-6 flex gap-4">
        <input type="text" placeholder="Name" value={filters.name || ""}  onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
        <input type="number" placeholder="Age" value={filters.age || ""} onChange={(e) => setFilters({ ...filters, age: e.target.value })}/>
        <input type="text" placeholder="Color" value={filters.color || ""} onChange={(e) => setFilters({ ...filters, color: e.target.value })}/>
        <input type="text" placeholder="Size"value={filters.size || ""} onChange={(e) => setFilters({ ...filters, size: e.target.value })}/>
        <button onClick={() => setFilters({})}>Clear Filters</button>
      </div>

      {/* Pet List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Pets;