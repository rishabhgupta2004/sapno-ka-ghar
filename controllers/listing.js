const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};
module.exports.rendernewroute=(req, res) => {
 
  
    res.render("listings/new.ejs");
  };
  module.exports.rendershowroute=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
      req.flash("error","listing you requested for does not exist")
      
    res.redirect("/listings")
    }
    console.log(listing)
    res.render("listings/show.ejs", { listing });
  };
  module.exports.createlisting=async (req, res) => {
     let url=req.file.path
     let filename=req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success","New listing Created!")
    res.redirect("/listings");
  };
  
  module.exports.rendereditform=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error","listing you requested for does not exist")
      
    res.redirect("/listings")
    }
    let originalimageurl = listing.image.url;
    originalimageurl = originalimageurl.replace("/upload", "/uploads/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalimageurl });
    
  }
  module.exports.updatelisting=async (req, res) => {
    let { id } = req.params;
   
    let Listings =await Listing.findByIdAndUpdate(id, req.body.listing);
    if(typeof req.file!=="undefined"){
    let url=req.file.path
     
    let filename=req.file.filename;
    Listings.image={url,filename}
    await Listings.save()
    }
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`);
  };
  module.exports.destroylisting=async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      throw new ExpressError(404, "Listing not found");
      
    }
    req.flash("success","listing is deleted")
    res.redirect("/listings");
  };
  
  
  
  