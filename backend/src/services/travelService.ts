import { TravelData } from "../types/travelSafeTypes";

const travelDatabase: Record<string, Omit<TravelData, "city">> = {
  london: {
    advisoryLevel: "Moderate",
    routeStatus: "Busy",
    delayRisk: "Medium",
    visibility: "Good"
  },
  manchester: {
    advisoryLevel: "Moderate",
    routeStatus: "Slow Traffic",
    delayRisk: "High",
    visibility: "Fair"
  },
  birmingham: {
    advisoryLevel: "Low",
    routeStatus: "Open",
    delayRisk: "Low",
    visibility: "Good"
  },
  liverpool: {
    advisoryLevel: "Moderate",
    routeStatus: "Congested",
    delayRisk: "Medium",
    visibility: "Fair"
  },
  leeds: {
    advisoryLevel: "Low",
    routeStatus: "Open",
    delayRisk: "Low",
    visibility: "Good"
  },
  bristol: {
    advisoryLevel: "Low",
    routeStatus: "Clear",
    delayRisk: "Low",
    visibility: "Excellent"
  }
};

export const getTravelData = (city: string): TravelData => {
  const normalizedCity = city.trim().toLowerCase();

  const selectedTravel = travelDatabase[normalizedCity] ?? {
    advisoryLevel: "Moderate",
    routeStatus: "Open",
    delayRisk: "Medium",
    visibility: "Good"
  };

  return {
    city: normalizedCity,
    ...selectedTravel
  };
};