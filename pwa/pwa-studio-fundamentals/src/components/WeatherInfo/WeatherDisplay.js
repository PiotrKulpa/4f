import React from 'react';

import defaultClasses from './weatherInfo.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';

const WeatherDisplay = ({ data }) => {
  const classes = useStyle(defaultClasses);
  return (
    <div className={classes.weatherInfo}>
      <p className={classes.weatherLocation}>{data.location.name}</p>
      <div className={classes.weatherWrapper}>
        <img className={classes.weatherImage} alt="Current Weather" src={data.current.condition.icon} width="50" height="auto" />
        <span className={classes.tempInfo}>{`${data.current.temp_c}°C (${data.current.temp_f}°F)`}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;