const listings=require("../models/listing.js")
const Reviews=require("../models/review.js")

module.exports.newreview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log("newreview")
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review is created");
    res.redirect(`/listings/${listing._id}`);
  };
  module.exports.destroyreview=async (req, res, next) => {
    try {
      let { id, reviewId } = req.params;
      const listing = await Listing.findByIdAndDelete(reviewId);
      if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
      }
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
      }
      await Listing.findByIdAndUpdate(reviewId, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", "Review is deleted");
      res.redirect(`/listings/${id}`);
    } catch (err) {
      next(err);
    }
  };
  