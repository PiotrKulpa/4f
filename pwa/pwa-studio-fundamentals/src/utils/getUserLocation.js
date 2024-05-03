import { cracovCoords } from '../consts/index';

const getUserLocation = () => {
  return new Promise((resolve) => {
    const successCallback = (position) => {
      resolve(`${position.coords.latitude},${position.coords.longitude}`);
    };

    const errorCallback = (error) => {
      console.error(`Kod błędu: ${error.code}`);
      console.error(`Wiadomość błędu: ${error.message}`);
      resolve(cracovCoords);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  });
}

export default getUserLocation;