import Geolocation from 'react-native-geolocation-service';


export const getCurrentLocation = () => {
  console.log("getCurrentLocation")
  Geolocation.getCurrentPosition(
    position => {
      console.log("Getting Location",position.coords.latitude.toString(), position.coords.longitude.toString())

    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message, "HERE");
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
  );
};
