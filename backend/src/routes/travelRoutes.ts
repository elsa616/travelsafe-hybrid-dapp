import express from "express";
import {
  getWeatherByCity,
  getDaylightByCity,
  getTravelByCity,
  getJourneyByCity,
  recordJourneyData
} from "../controllers/travelController";

const router = express.Router();

router.get("/weather/:city", getWeatherByCity);
router.get("/daylight/:city", getDaylightByCity);
router.get("/travel/:city", getTravelByCity);
router.get("/journey/:city", getJourneyByCity);
router.post("/blockchain/record", recordJourneyData);

export default router;