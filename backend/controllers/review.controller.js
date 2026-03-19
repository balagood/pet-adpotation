import Review from "../models/Review.js"

export const addReview = async(req,res)=>{
    try {
        const { userId,petId, shelterId, rating, comment } = req.body;
        //const userId = req.user._id; // from authMiddleware

        const review = new Review({ userId, petId, shelterId, rating, comment });
        await review.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const getReviewsByPet = async (req, res) => {
  try {
    const reviews = await Review.find({ petId: req.params.petId })
      .populate("userId", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const getReviewsByShelter = async (req, res) => {
  try {
    const reviews = await Review.find({ shelterId: req.params.shelterId })
      .populate("userId", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

