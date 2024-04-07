const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/test";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const dataWithOwner = initData.data.map(obj => ({
    ...obj,
    owner: "66094894527c6a6f9f09aa4e" // Assuming this is a valid ObjectId
  }));
  await Listing.insertMany(dataWithOwner);
  console.log("Data was initialized");
};
initDB();

