import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected DB 😎");
} catch (error) {
  console.log("Error de conexión a mongodb:" + error);
}
