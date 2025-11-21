import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    allowedStores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    allowedPages: {
      type: [String],
      default: [],
      enum: ["dashboard", "order", "product", "cost", "setting"],
    },
  },
  {
    timestamps: true,
  },
);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
