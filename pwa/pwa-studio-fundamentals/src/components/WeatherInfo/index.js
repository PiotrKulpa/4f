import React, { useEffect, useState } from 'react';
import defaultClasses from './weatherInfo.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import getUserLocation from '../../utils/getUserLocation';
import getWeatherData from '../../utils/getWeatherData';

const WeatherInfo = props => {
  const classes = useStyle(defaultClasses, props.classes);
  const[weatherData, setWeatherData] = useState({});

  useEffect(() => {
    async function getWeatherInfo() {
      const userLocationResponse = await getUserLocation();
      const weatherDataResponse = await getWeatherData(userLocationResponse);
      setWeatherData(weatherDataResponse);
    }

    getWeatherInfo();

  }, []);

  return (
    <>
      {Object.keys(weatherData).length > 0 ? <div className={classes.weatherInfo}>
        <p className={classes.weatherLocation}>{weatherData?.location?.name}</p>
        <div className={classes.weatherWrapper}>
          <img className={classes.weatherImage} width="50px" height="auto" src={weatherData?.current?.condition?.icon} />
          <span className={classes.tempInfo}>{`${weatherData?.current?.temp_c}°c (${weatherData?.current?.temp_f}°f)`}</span>  
        </div>
      </div> : <p className={classes.loading}>Loading...</p>}
    </>
  );
};

export default WeatherInfo;