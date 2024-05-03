import { weatherApiUrl } from '../consts/index';

const getWeatherData = async (coords) => {
  try {
    const response = await fetch(`${weatherApiUrl}${coords}`);
    const weatherDataResponse = await response.json();
    return weatherDataResponse;
  } catch (error) {
    console.error(error);
    return {};
  } 
};

export default getWeatherData;