const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isloggedin, isowner, validateListing } = require('../middleware');
const listingController = require("../controllers/listing");
const multer = require("multer");
const { storage } = require("../cloudconfig");
const path = require('path');

const upload = multer({ storage });

// Index Route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedin,
    //validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createlisting)
  )
 
  




// New Listing Route
router.get("/new", isloggedin, listingController.rendernewroute);

// Show Listing Route
router.route("/:id")
  .get(wrapAsync(listingController.rendershowroute))
  .put(
   
    isloggedin,
    isowner,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updatelisting)
  )
  .delete(
    isloggedin,
    isowner,
    wrapAsync(listingController.destroylisting)
  );

// Edit Listing Route
router.get("/:id/edit", isloggedin, isowner, wrapAsync(listingController.rendereditform));

module.exports = router;
