export const configNewStore = async (req, res) => {
  const { storeName, baseURL, consumerKey, consumerSecret } = req.body;

  if (!storeName || !baseURL || !consumerKey || !consumerSecret) {
    return res.status(400).json({
      status: "fail",
      message: "Missing one or more required fields",
    });
  }

  res
    .status(201)
    .json({ status: "success", message: "Store added succssfully" });
};
