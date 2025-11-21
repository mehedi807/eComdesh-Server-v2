import { Webhook } from "svix";
import User from "../models/User.js";

export const syncUserFromClerk = async (req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET ");
    }

    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const emailObj = attributes.email_addresses?.find(
        (email) => email.id === attributes.primary_email_address_id
      );
      const email = emailObj ? emailObj.email_address : null;

      const firstName = attributes.first_name;
      const lastName = attributes.last_name;

      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          $set: {
            clerkId: id,
            email: email,
            name: `${firstName || ""} ${lastName || ""}`.trim(),
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Clerk Webhook Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
