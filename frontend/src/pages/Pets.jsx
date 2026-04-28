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
  }, [dispatch, filters]);

  if (loading) return <p className="text-center p-6">Loading pets...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Find Your Perfect Companion</h2>
        <span className="text-gray-500">
          {list.length} pets found
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-3">Filter Pets</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={filters.name || ""}
            onChange={(e) =>{
              const value = e.target.value;
              if (/^[A-Za-z ]*$/.test(value)){
                setFilters({ ...filters, name: e.target.value })
              }
            }}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Age"
            value={filters.age || ""}
            onChange={(e) =>{
              const value = e.target.value;

              if (/^[0-9]*$/.test(value)) {
                setFilters({ ...filters, age: value });
              }
          }}
          />

          <input
            className="border p-2 rounded"
            placeholder="Color"
            value={filters.color || ""}
            onChange={(e) =>{
              const value = e.target.value;
              if (/^[A-Za-z ]*$/.test(value)){
                setFilters({ ...filters, color: e.target.value })
              }
            }}
          />

          <select
            className="border p-2 rounded"
            value={filters.size || ""}
            onChange={(e) =>
              setFilters({ ...filters, size: e.target.value })
            }
          >
            <option value="">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <button
            onClick={() => setFilters({})}
            className="bg-gray-100 hover:bg-gray-200 rounded px-3"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Pets Grid */}
      {list.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No pets found
          </p>
           <p className="text-gray-400 mt-2">
    Try changing filters
  </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Pets;