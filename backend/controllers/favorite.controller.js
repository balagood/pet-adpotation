import Favorite from "../models/Favorite.js";


export const addFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const exists = await Favorite.findOne({ userId, petId });
    if (exists) return res.json({ message: "Already favorited" });

    const fav = new Favorite({ userId, petId });
    await fav.save();

    res.json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getFavorites = async (req, res) => {
  try {
    const favs = await Favorite.find({ userId: req.params.userId })
      .populate("petId");

    res.json(favs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.body.userId,
      petId: req.body.petId,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};