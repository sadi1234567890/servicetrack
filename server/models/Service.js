const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Monthly price is required"],
      min: [0, "Price cannot be negative"],
    },
    renewalDate: {
      type: Date,
      required: [true, "Renewal date is required"],
    },
 status: {
  type: String,
  enum: ["Active", "Paused", "Inactive"],
  default: "Active",
},
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);