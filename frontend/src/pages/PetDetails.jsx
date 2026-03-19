import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { applyPet } from "../slices/applicationSlice";
import { useEffect, useState } from "react";
import { getPetById } from "../api/petService";
import { fetchReviews, createReview } from "../slices/reviewSlice";
import toast from "react-hot-toast";


export default function PetDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loading = useSelector((state) => state.applications.loading);

  const reviews = useSelector((state) => state.reviews?.list || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");


  const [pet, setPet] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(id);
        setPet(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPet();
  }, [id]);

  useEffect(() => {
  if (id) {
    dispatch(fetchReviews(id));
  }
}, [id,dispatch]);

const handleReview = async () => {
  try {
    if (!user || !user._id) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment required");
      return;
    }

    await dispatch(
      createReview({
        userId: user?._id,
        petId: id,
        rating: Number(rating),
        comment,
      })
    ).unwrap(); 
    toast.success("Review Added");

    setComment(""); 

    dispatch(fetchReviews(id));

  } catch (err) {
    console.error(err);
    toast.error("Error adding review");
  }
};

  /*const handleApply = () => {
    dispatch(
      applyPet({
        petId: id,
        userId: "69ad2f4daf6855f9de25df86", // temp
        shelterId: pet?.shelterId,
        status: "submitted",
      })
    );
  };*/ 

  const handleApply = async () => {
  try {
        if(!user || !pet) return;
        const res = dispatch(
        applyPet({
            petId: id,
            userId: user._id,
            shelterId: pet.shelterId,
            status:"submitted",
            //userId: "69ad2f4daf6855f9de25df86",
            //shelterId: "69ad867e7cb038246537335d",
        })
        ).unwrap(); 

    toast.success("Application submitted successfully");

    navigate("/applications");

  } catch (err) {
        console.error(err);
        toast.error("Error submitting application");
    }
  }; 
  if (!pet) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>

      {pet.photos && pet.photos.length > 0 && (
        <img
          src={`https://pet-adpotations.onrender.com${pet.photos[0]}`}
          alt={pet.name}
          className="w-full h-60 object-cover rounded mb-4"
        />
      )}

      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Size:</strong> {pet.size}</p>
      <p><strong>Status:</strong> {pet.status}</p>

      <button
        onClick={handleApply} disabled={loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Applying..":"Apply"}
      </button>
      {/* ✅ REVIEW FORM */}
      {user?.role === "adopter" && (
        <div className="mt-6">
          <h3 className="font-bold">Add Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 mt-2"
          >
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n} Star</option>
            ))}
          </select>

          <input
            type="text"
            value={comment}
            placeholder="Write comment"
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full mt-2"
          />

          <button
            onClick={handleReview}
            className="bg-green-500 text-white px-3 py-2 mt-2 rounded"
          >
            Submit Review
          </button>
        </div>
      )}
      <div className="mt-6">
        <h3 className="font-bold">Reviews</h3>

        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map((r) => (
          <div key={r._id} className="border p-2 mt-2 rounded">
            <p><b>{r.userId?.name}</b></p>
            <p>⭐ {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
}