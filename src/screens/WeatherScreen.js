import { View, Text, StyleSheet } from "react-native";
import React from "react";
import * as Location from "expo-location";
import axios from "axios";
import { WEATHER_KEY } from "@env";
import { Feather } from "@expo/vector-icons";

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
      setLocation(location);
    })();
  }, []);

  React.useEffect(() => {
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}`;
      axios
        .get(url)
        .then((response) => {
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

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clouds":
        return <Feather name='cloud' size={24} color='black' />;
      case "Clear":
        return <Feather name='sun' size={24} color='black' />;
      case "Rain":
        return <Feather name='cloud-rain' size={24} color='black' />;
      case "Snow":
        return <Feather name='cloud-snow' size={24} color='black' />;
      case "Thunderstorm":
        return <Feather name='cloud-lightning' size={24} color='black' />;
      case "Drizzle":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      case "Mist":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      case "Smoke":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      case "Haze":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      case "Dust":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      case "Fog":
        return <Feather name='cloud-drizzle' size={24} color='black' />;
      default:
        return <Feather name='cloud' size={24} color='black' />;
    }
  };

  return (
    <View>
      <Text>Weather</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      {weatherData && (
        <View>
          <Text>{weatherData.name}</Text>
          <Text>{weatherData.weather[0].description}</Text>
          {getWeatherIcon(weatherData.weather[0].main)}
          <Text>{kelvinToCelsius(weatherData.main.temp)}°C</Text>
        </View>
      )}
    </View>
  );
}
