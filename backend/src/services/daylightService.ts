import { DaylightData } from "../types/travelSafeTypes";

const daylightDatabase: Record<string, Omit<DaylightData, "city">> = {
  london: { sunrise: "06:10", sunset: "19:58", daylightHours: "13h 48m" },
  manchester: { sunrise: "06:15", sunset: "19:55", daylightHours: "13h 40m" },
  birmingham: { sunrise: "06:12", sunset: "19:56", daylightHours: "13h 44m" },
  liverpool: { sunrise: "06:18", sunset: "19:53", daylightHours: "13h 35m" },
  leeds: { sunrise: "06:14", sunset: "19:54", daylightHours: "13h 40m" },
  bristol: { sunrise: "06:08", sunset: "19:59", daylightHours: "13h 51m" }
};

export const getDaylightData = (city: string): DaylightData => {
  const normalizedCity = city.trim().toLowerCase();

  const selectedDaylight = daylightDatabase[normalizedCity] ?? {
    sunrise: "06:00",
    sunset: "18:00",
    daylightHours: "12h 00m"
  };

  return {
    city: normalizedCity,
    ...selectedDaylight
  };
};