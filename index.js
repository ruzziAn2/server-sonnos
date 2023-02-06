import "dotenv/config";
import "./database/connect.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import gymRoutes from "./routes/gym.route.js";
import clientRoutes from "./routes/client.route.js";

const app = express();
// const whiteList = [process.env.ORIGIN1];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (whiteList.includes(origin)) {
//         return callback(null, origin);
//       }
//       return callback("Error de CORS origin: " + origin + " no autorizado!");
//     },
//   })
// );
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/gyms", gymRoutes);
app.use("/api/v1/gyms", clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🔥🔥🔥 http://localhost:" + PORT + " 🔥🔥🔥");
});
