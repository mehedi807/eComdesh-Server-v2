import { storeSchema } from "../schema/store.schema.js";

export const validateStoreBody = (req, res, next) => {
  const result = storeSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  req.body = result.data; //sanitized data
  next();
};
