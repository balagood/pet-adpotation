import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { applyPet } from "../slices/applicationSlice";
import { useEffect, useState } from "react";
import { getPetById } from "../api/petService";
import { fetchReviews, createReview } from "../slices/reviewSlice";
import { fetchUserApplications } from "../slices/applicationSlice";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";

export default function PetDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loading = useSelector((state) => state.applications.loading);
  const reviews = useSelector((state) => state.reviews?.list || []);
  const user = useSelector((state) => state.user.user);

  //const applications = useSelector((state) => state.applications.list);
  const applications = useSelector((state) => state.applications.list || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const data = await getPetById(id);
      setPet(data);
    };
    fetchPet();
  }, [id]);

  useEffect(() => {
    if (id) dispatch(fetchReviews(id));
  }, [id, dispatch]);

  useEffect(() => {
  if (user?._id) {
    dispatch(fetchUserApplications(user._id));
  }
}, [dispatch, user]);

  const handleApply = async () => {
    try {
      if (!user || !pet) return;

      await dispatch(
        applyPet({
          petId: id,
          //userId: user._id,
          //shelterId: pet.shelterId,
          shelterId: pet.shelterId?._id || pet.shelterId,
          //status:"submitted",
        })
      ).unwrap();

      await dispatch(fetchUserApplications(user._id));
      toast.success("Application submitted successfully");
      navigate("/applications");

    } catch {
      toast.error("Error submitting application");
    }
  };

  const handleReview = async () => {
    if (!user) return toast.error("Login first");
    if (!comment.trim()) return toast.error("Comment required");

    await dispatch(
      createReview({
        userId: user._id,
        petId: id,
        rating,
        comment,
      })
    ).unwrap();

    toast.success("Review Added");
    setComment("");
    dispatch(fetchReviews(id));
  };

  //const existingApplication = applications.find((app) =>(app.petId?._id || app.petId) === id);
  const existingApplication = applications.find((app) => String(app.petId?._id || app.petId) === String(id)); 
  if (!pet) return <p className="p-6">Loading...</p>;

  const hasAdopted = applications.some((app) =>String(app.petId?._id || app.petId) === String(id) &&app.status === "approved");
  const hasApplied = applications.some((app) =>String(app.petId?._id || app.petId) === String(id));

  if (!pet) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Top Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        

        {/* Images */}
        <div>
          <img
            src={pet.photos?.[0] || "/no-image.png"}
            className="w-full h-96 object-cover rounded-xl"
          />

          <div className="grid grid-cols-4 gap-2 mt-2">
            {pet.photos?.slice(1).map((img, i) => (
              <img
                key={i}
                src={`${BASE_URL}${img}`}
                className="h-20 w-full object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{pet.name}</h1>

          <p className="text-gray-600 mt-1">{pet.breed}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{pet.age}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Size</p>
              <p className="font-semibold">{pet.size}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold">{pet.status}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{pet.location || "N/A"}</p>
            </div>
          </div>
          {pet.status === "available" && user?.role === "adopter" && (
          <button
            onClick={handleApply}
            disabled={loading || existingApplication}
           className={`w-full mt-6 py-3 rounded-lg text-white ${existingApplication? "bg-gray-400 cursor-not-allowed": loading? "bg-gray-400": "bg-blue-600 hover:bg-blue-700"}`}>
           {existingApplication? "Already Applied": loading? "Applying...": "Adopt this Pet"}
          </button> 
          )}
        </div>

      </div>

      {/* Description */}
      {pet.description && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-gray-600">{pet.description}</p>
        </div>
      )}

      {/* Validation Message */}
      {user?.role === "adopter" && !hasAdopted && (
        <p className="text-red-500 mt-4">
          You can review only after adopting this pet
        </p>
      )}

      {/* Add Review */}
      {user?.role === "adopter" && hasAdopted && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">Add Review</h3>

          <div className="flex gap-2 mt-2">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n} Star</option>
              ))}
            </select>

            <input
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              placeholder="Write comment..."
              className="border p-2 flex-1 rounded"
            />

            <button
              onClick={handleReview}
              className="bg-green-500 text-white px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Reviews</h3>

        {reviews.length === 0 && (
          <p className="text-gray-500 mt-2">No reviews yet</p>
        )}

        <div className="space-y-3 mt-3">
          {reviews.map((r) => (
            <div key={r._id} className="border p-3 rounded-lg">
              <p className="font-semibold">{r.userId?.name}</p>
              <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}