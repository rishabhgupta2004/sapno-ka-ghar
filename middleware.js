const Listing = require("./models/listing");
const ExpressError = require("./utils/expresserrors.js");
const { listingschema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirecturl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveredirecturl = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.session.redirecturl && req.session.redirecturl !== "/login") {
      res.locals.redirecturl = req.session.redirecturl;
    }
  }
  next();
};

module.exports.isowner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You don't have permission to edit");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingschema.validate(req.body);
  if (error) {
    const errmsg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(400, errmsg));
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errmsg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(400, errmsg));
  } else {
    next();
  }
};

module.exports.isreviewauthor = async (req, res, next) => {
 
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(req.LOCAuser._id)) {
      req.flash("error", "You are not the author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } 
    
  

