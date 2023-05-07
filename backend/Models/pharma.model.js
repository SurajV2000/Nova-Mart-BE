const mongoose = require("mongoose");

const pharmaSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    brand_name: { type: String },
    media: [{ url: String }],
    rating: {type:Number},
    rating_count: {type:Number},
    quantity: { type: Number, require: true },
    pack_size: { type: String },
    tracking_metadata: { es_score: Number, popularity: Number },
    star_rating_percentage: { type: Number }
  },
  {
    versionKey: false,
  }
);

const PharmaModel = mongoose.model("pharma", pharmaSchema);

module.exports = {
  PharmaModel,
};
