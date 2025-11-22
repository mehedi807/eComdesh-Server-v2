export const configNewStore = async (req, res) => {
  res
    .status(201)
    .json({ status: "success", message: "Store added succssfully" });
};
