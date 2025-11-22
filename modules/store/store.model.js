import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    baseURL: {
      type: String,
      required: true,
    },
    storeLogo: {
      type: String,
      default: "",
    },
    consumerKey: {
      type: String,
      required: true,
    },
    consumerSecret: {
      type: String,
      required: true,
    },
    orderCreateWebHookId: {
      type: Number,
    },
    productCreateWebHookId: {
      type: Number,
    },
    productUpdateWebHookId: {
      type: Number,
    },
    isWebHookCreated: {
      type: Boolean,
    },
    isProductSynced: {
      type: Boolean,
    },
    lastProductSync: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
