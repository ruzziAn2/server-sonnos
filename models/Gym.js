import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gymSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  //revisar campos
  class: {
    type: Array,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
});

export const Gym = model("Gym", gymSchema);
