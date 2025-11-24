import Store from "./store.model.js";

export const createStore = async (storeData, userId) => {
  const existingStore = await Store.findOne({
    userId,
    $or: [{ storeName: storeData.storeName }, { baseURL: storeData.baseURL }],
  });

  if (existingStore) {
    throw new Error("You already have a store with this name or URL.");
  }

  const newStore = new Store({ ...storeData, userId });
  await newStore.save();
  return newStore;
};

export const findStores = async (userId) => {
  return Store.find({ userId });
};

export const findStore = async (storeId, userId) => {
  const store = await Store.findOne({ _id: storeId, userId });
  if (!store) {
    throw new Error("Store not found");
  }
  return store;
};

export const updateStore = async (storeId, userId, updateData) => {
  const store = await Store.findOneAndUpdate(
    { _id: storeId, userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!store) {
    throw new Error(
      "Store not found or you do not have permission to update it."
    );
  }

  return store;
};
