import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { updatePet } from "../slices/petSlice";
import { getPetById } from "../api/petService";
import { useNavigate, useParams } from "react-router-dom";

const EditPet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state)=>state.pets.loading);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    size: "",
    color: "",
    status: "",
  });

  // ✅ Fetch pet by ID
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(id);

        setFormData({
          name: data.name || "",
          breed: data.breed || "",
          age: data.age || "",
          size: data.size || "",
          color: data.color || "",
          status: data.status || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit data');
    try {
    console.log("Updating:", id, formData);

        await dispatch(
          updatePet({
            id: id,
            petData: formData,
          })
        ).unwrap();

        alert("Updated successfully");
        navigate("/pets");
      } catch (err) {
        console.error(err);
        alert("Update failed");
      }

    // await dispatch(
    //   updatePet({
    //     id: id,
    //     petData: formData,
    //   })
    // ).unwrap();

    // alert("Pet updated successfully ✅");
    // navigate("/pets");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name"
  />

  <input
    name="breed"
    value={formData.breed}
    onChange={handleChange}
    placeholder="Breed"
  />

  <input
    name="age"
    value={formData.age}
    onChange={handleChange}
    placeholder="Age"
  />

  <input
    name="size"
    value={formData.size}
    onChange={handleChange}
    placeholder="Size"
  />

  <input
    name="color"
    value={formData.color}
    onChange={handleChange}
    placeholder="Color"
  />

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="">Select Status</option>
    <option value="available">Available</option>
    <option value="adopted">Adopted</option>
  </select>

  <button type="submit" disabled={loading}>
    {loading ? "Updating..":"Update Pet"}
  </button>

</form>
    
    
  );
};

export default EditPet;