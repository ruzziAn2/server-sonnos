import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gymSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // en la solicitud mandar el email que con eso capturará el _id
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Gym = model("Gym", gymSchema);
