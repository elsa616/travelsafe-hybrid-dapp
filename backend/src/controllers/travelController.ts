import { Request, Response } from "express";
import { getWeatherData } from "../services/weatherService";
import { getDaylightData } from "../services/daylightService";
import { getTravelData } from "../services/travelService";
import { recordJourneyOnBlockchain } from "../services/blockchainService";
import {
  JourneyResponse,
  BlockchainRecordRequest
} from "../types/travelSafeTypes";

type CityParams = {
  city: string;
};

export const getWeatherByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const weatherData = getWeatherData(city);
  res.status(200).json(weatherData);
};

export const getDaylightByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const daylightData = getDaylightData(city);
  res.status(200).json(daylightData);
};

export const getTravelByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const travelData = getTravelData(city);
  res.status(200).json(travelData);
};

export const getJourneyByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;

  const response: JourneyResponse = {
    city: city.trim().toLowerCase(),
    weather: getWeatherData(city),
    daylight: getDaylightData(city),
    travel: getTravelData(city)
  };

  res.status(200).json(response);
};

export const recordJourneyData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const payload: BlockchainRecordRequest = req.body;
  const result = await recordJourneyOnBlockchain(payload);
  res.status(200).json(result);
};