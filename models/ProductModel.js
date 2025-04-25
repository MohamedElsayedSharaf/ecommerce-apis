const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Product name must be unique"],
      minlength: [3, "Too short Product name"],
      maxlength: [100, "Too long Product name"],
    },
    slug: {
      type: String,
      required: true,
      lowerCase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short Product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [20000000, "Too long price"],
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      required: [true, "Product cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    subcategories: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const images = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      images.push(imageUrl);
    });
    doc.images = images;
  }
};
productSchema.post("init", (doc) => {
  setImageUrl(doc);
});
productSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
