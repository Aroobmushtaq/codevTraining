import Review from "../models/Review.js";
import Menu from "../models/menu.js";


// ✅ POST /api/reviews → Add review
const addReview = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;  // ✅ from params
    const { rating, comment } = req.body;

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      menuItem: menuItemId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this item" });
    }

    const review = await Review.create({
      user: req.user._id,
      menuItem: menuItemId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added", review });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/reviews/:menuId → Get reviews of menu item
const getReviewsByMenu = async (req, res) => {
  try {
    const reviews = await Review.find({
      menuItem: req.params.menuItemId,
    }).populate("user", "name");

    res.json(reviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ DELETE /api/reviews/:id → Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { addReview, getReviewsByMenu, deleteReview };
