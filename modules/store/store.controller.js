import * as storeService from "./store.service.js";

export const createNewStore = async (req, res) => {
  try {
    const newStore = await storeService.createStore(req.body, req.auth.userId);
    res.status(201).json({
      status: "success",
      message: "Store added",
      data: newStore,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const getStores = async (req, res) => {
  try {
    const stores = await storeService.findStores(req.auth.userId);
    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await storeService.findStore(storeId, req.auth.userId);
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const updatedStore = await storeService.updateStore(
      storeId,
      req.auth.userId,
      req.body
    );
    res.status(200).json({
      status: "success",
      message: "Store updated",
      data: updatedStore,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
