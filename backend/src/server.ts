import express from "express";
import cors from "cors";
import travelRoutes from "./routes/travelRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "TravelSafe backend is running." });
});

app.use("/api", travelRoutes);

app.listen(PORT, () => {
  console.log(`TravelSafe backend server is running on port ${PORT}`);
});