const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    brand_name: { type: String },
    media: [{ url: String }],
    rating: { type: Number },
    rating_count: { type: Number },
    quantity: { type: Number, require: true },
    pack_size: { type: String },
    tracking_metadata: { es_score: Number, popularity: Number },
    star_rating_percentage: { type: Number },
    authorID: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};
