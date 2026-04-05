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
  return () => clearTimeout(timeout);
    //dispatch(fetchPets(filters)); // fetch with filters
  }, [dispatch, filters]);

  if (loading) return <p className="text-center p-4">Loading pets...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Pets</h2>

      {/* Filter Form */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <input className="border p-2 rounded" type="text" placeholder="Name" value={filters.name || ""}  onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
        <input className="border p-2 rounded" type="number" placeholder="Age" value={filters.age || ""} onChange={(e) => setFilters({ ...filters, age: e.target.value })}/>
        <input className="border p-2 rounded" type="text" placeholder="Color" value={filters.color || ""} onChange={(e) => setFilters({ ...filters, color: e.target.value })}/>
        <select className="border p-2 rounded" value={filters.size || ""}onChange={(e) => setFilters({ ...filters, size: e.target.value })}>
          <option value="">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <button onClick={() => setFilters({})}className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"> Clear</button>
      </div>

      {/* Pet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.length === 0 ? (<p className="text-center text-gray-500 col-span-full">No pets found</p>) : (
        list.map((pet) => (<PetCard key={pet._id} pet={pet} />)))}
      </div>
    </div>
  );
};

export default Pets;