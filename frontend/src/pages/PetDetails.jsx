import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyPet, fetchUserApplications } from "../slices/applicationSlice";
import { useEffect, useState } from "react";
import { getPetById } from "../api/petService";
import { fetchReviews, createReview } from "../slices/reviewSlice";
import {
  fetchShelterReviews,
  createShelterReview,
} from "../slices/shelterReviewSlice";
import MeetRequestForm from "../components/MeetRequestForm";
import toast from "react-hot-toast";

export default function PetDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.applications.loading);
  const reviews = useSelector((state) => state.reviews?.list || []);
  const user = useSelector((state) => state.user.user);
  const applications = useSelector((state) => state.applications.list || []);
  const shelterReviews = useSelector(
    (state) => state.shelterReviews?.list || []
  );

  const [shelterRating, setShelterRating] = useState(5);
  const [shelterComment, setShelterComment] = useState("");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [pet, setPet] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPet = async () => {
      const data = await getPetById(id);

      console.log("Pet Data:", data);
      console.log("Photos:", data.photos);
      console.log("Videos:", data.videos);

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

  useEffect(() => {
    if (pet?.shelterId) {
      dispatch(fetchShelterReviews(pet.shelterId));
    }
  }, [pet, dispatch]);

  const handleApply = async () => {
    try {
      if (!user || !pet) return;

      await dispatch(
        applyPet({
          petId: id,
          shelterId: pet.shelterId?._id || pet.shelterId,
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
        shelterId: pet.shelterId,
        rating,
        comment,
      })
    ).unwrap();

    toast.success("Review Added");
    setComment("");
    dispatch(fetchReviews(id));
  };

  const handleShelterReview = async () => {
    await dispatch(
      createShelterReview({
        userId: user._id,
        shelterId: pet.shelterId,
        rating: shelterRating,
        comment: shelterComment,
      })
    );
  };

  const existingApplication = applications.find(
    (app) => String(app.petId?._id || app.petId) === String(id)
  );

  const hasAdopted = applications.some(
    (app) =>
      String(app.petId?._id || app.petId) === String(id) &&
      app.status === "approved"
  );

  if (!pet) return <p className="p-6">Loading...</p>;

  const media = [
    ...(pet?.photos || []).map((item) => ({
      type: "image",
      url: item.url || item,
    })),
    ...(pet?.videos || []).map((item) => ({
      type: "video",
      url: item.url || item,
    })),
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {media.length > 0 && (
            <>
              <div className="relative">
                {media[currentIndex]?.type === "image" ? (
                  <img
                    key={currentIndex}
                    src={media[currentIndex]?.url}
                    alt="Pet"
                    className="w-full h-96 object-cover rounded-xl"
                  />
                ) : (
                  <video
                    key={currentIndex}
                    controls
                    className="w-full h-96 object-cover rounded-xl"
                  >
                    <source
                      src={media[currentIndex]?.url}
                      type="video/mp4"
                    />
                  </video>
                )}

                {currentIndex > 0 && (
                  <button
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className="absolute left-2 top-1/2 bg-black text-white px-3 py-1 rounded"
                  >
                    ❮
                  </button>
                )}

                {currentIndex < media.length - 1 && (
                  <button
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    className="absolute right-2 top-1/2 bg-black text-white px-3 py-1 rounded"
                  >
                    ❯
                  </button>
                )}
              </div>
            </>
          )}
        </div>

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
              className={`w-full mt-6 py-3 rounded-lg text-white ${
                existingApplication
                  ? "bg-gray-400 cursor-not-allowed"
                  : loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {existingApplication
                ? "Already Applied"
                : loading
                ? "Applying..."
                : "Adopt this Pet"}
            </button>
          )}

          {/* Meet & Greet Section Added */}
          {pet.status === "available" && user?.role === "adopter" && (
            <div className="mt-6 border-t pt-6">
              <MeetRequestForm
                pet={{
                  ...pet,
                  shelterId: pet.shelterId?._id || pet.shelterId,
                }}
                adopterId={user._id}
              />
            </div>
          )}
        </div>
      </div>

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
      <div className="mt-10">
        <h3 className="text-xl font-bold">Shelter Reviews</h3>

        {/* Add form */}
        {user?.role === "adopter" && hasAdopted && (
          <div className="flex gap-2 mt-4">
            <select
              value={shelterRating}
              onChange={(e) => setShelterRating(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <input
              value={shelterComment}
              onChange={(e) => setShelterComment(e.target.value)}
              placeholder="Write shelter review..."
              className="border p-2 flex-1 rounded"
            />

            <button
              onClick={handleShelterReview}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Submit
            </button>
          </div>
        )}

        {/* List reviews */}
        <div className="space-y-3 mt-4">
          {shelterReviews?.length === 0 && (
            <p className="text-gray-500">No shelter reviews yet</p>
          )}

          {shelterReviews?.map((r) => (
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