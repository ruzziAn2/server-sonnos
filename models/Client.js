import mongoose from "mongoose";
const { Schema, model } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gym: {
    type: Schema.Types.ObjectId,
    ref: 'Gym',
    required: true
  }
});

export const Client = model("Client", clientSchema);
