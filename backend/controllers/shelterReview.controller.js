import ShelterReview from "../models/ShelterReview.js";
import Shelter from "../models/Shelter.js";

/**
 * ADD SHELTER REVIEW
 */
export const createShelterReview = async (req, res) => {
  try {
    const { userId, shelterId, rating, comment } = req.body;

    // 1. Save review
    const review = new ShelterReview({
      userId,
      shelterId,
      rating,
      comment,
    });

    await review.save();

    // 2. Get all reviews for this shelter
    const reviews = await ShelterReview.find({ shelterId });

    // 3. Calculate average rating
    const totalRatings = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = totalRatings / reviews.length;

    // 4. Update shelter
    await Shelter.findByIdAndUpdate(shelterId, {
      ratingAvg: avgRating,
      totalReviews: reviews.length,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
      ratingAvg: avgRating,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET REVIEWS BY SHELTER ID
 */
export const getShelterReviews = async (req, res) => {
  try {
    const { shelterId } = req.params;

    const reviews = await ShelterReview.find({ shelterId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};