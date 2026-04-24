import { WeatherData } from "../types/travelSafeTypes";

const weatherDatabase: Record<string, Omit<WeatherData, "city">> = {
  london: { temperature: 18, humidity: 81, wind: 12, rainChance: 67 },
  manchester: { temperature: 15, humidity: 84, wind: 10, rainChance: 72 },
  birmingham: { temperature: 17, humidity: 79, wind: 9, rainChance: 61 },
  liverpool: { temperature: 14, humidity: 86, wind: 14, rainChance: 75 },
  leeds: { temperature: 16, humidity: 80, wind: 11, rainChance: 64 },
  bristol: { temperature: 19, humidity: 76, wind: 8, rainChance: 58 }
};

export const getWeatherData = (city: string): WeatherData => {
  const normalizedCity = city.trim().toLowerCase();

  const selectedWeather = weatherDatabase[normalizedCity] ?? {
    temperature: 18,
    humidity: 80,
    wind: 10,
    rainChance: 60
  };

  return {
    city: normalizedCity,
    ...selectedWeather
  };
};