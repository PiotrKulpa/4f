import React, { useEffect, useState } from 'react';

import WeatherDisplay from './WeatherDisplay';
import getUserLocation from '../../utils/getUserLocation';
import getWeatherData from '../../utils/getWeatherData';

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        const userLocationResponse = await getUserLocation();
        const weatherDataResponse = await getWeatherData(userLocationResponse);
        setWeatherData(weatherDataResponse);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    getWeatherInfo();
  }, []);

  return (
    <>
      {Object.keys(weatherData).length > 0 && <WeatherDisplay data={weatherData} />}
    </>
  );
};

export default WeatherInfo;
