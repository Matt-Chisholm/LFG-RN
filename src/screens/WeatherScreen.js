import { View, Text, StyleSheet } from "react-native";
import React from "react";
import * as Location from "expo-location";
import axios from "axios";
import { WEATHER_KEY } from "@env";

export default function WeatherScreen() {
  const [location, setLocation] = React.useState(null);
  const [weatherData, setWeatherData] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  React.useEffect(() => {
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg(error);
        });
    }
  }, [location]);

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <View>
      <Text>Weather</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      {weatherData && (
        <View>
          <Text>{weatherData.name}</Text>
          <Text>{weatherData.weather[0].description}</Text>
          <Text>{kelvinToCelsius(weatherData.main.temp)}°C</Text>
        </View>
      )}
    </View>
  );
}
