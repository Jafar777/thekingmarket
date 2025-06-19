import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;