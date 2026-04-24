export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rainChance: number;
}

export interface DaylightData {
  city: string;
  sunrise: string;
  sunset: string;
  daylightHours: string;
}

export interface TravelData {
  city: string;
  advisoryLevel: string;
  routeStatus: string;
  delayRisk: string;
  visibility: string;
}

export interface JourneyResponse {
  city: string;
  weather: WeatherData;
  daylight: DaylightData;
  travel: TravelData;
}

export interface BlockchainRecordRequest {
  city: string;
  weather: WeatherData;
  daylight: DaylightData;
  travel: TravelData;
}

export interface BlockchainRecordResponse {
  success: boolean;
  message: string;
  txId: string;
  recordedAt: string;
}