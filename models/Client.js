import mongoose from "mongoose";
const { Schema, model } = mongoose;

const clientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gym: {
    type: Schema.Types.ObjectId,
    ref: "Gym",
    required: true,
  },
});

export const Client = model("Client", clientSchema);
