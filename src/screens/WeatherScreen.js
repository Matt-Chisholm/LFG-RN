import { View, Text, StyleSheet, FlatList } from "react-native";
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

  const windDirection = (deg) => {
    if (deg > 337.5) {
      return "North";
    } else if (deg > 292.5) {
      return "North West";
    } else if (deg > 247.5) {
      return "West";
    } else if (deg > 202.5) {
      return "South West";
    } else if (deg > 157.5) {
      return "South";
    } else if (deg > 122.5) {
      return "South East";
    } else if (deg > 67.5) {
      return "East";
    } else if (deg > 22.5) {
      return "North East";
    } else {
      return "North";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your local weather : </Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {weatherData && (
        <View style={styles.weather_container}>
          <Text style={styles.weather_title}>{weatherData.name}</Text>
          <Text style={styles.description}>
            {weatherData.weather[0].description[0].toUpperCase() +
              weatherData.weather[0].description.slice(1)}
          </Text>
          <Text>{`Wind: ${weatherData.wind.speed} ${windDirection(
            weatherData.wind.deg
          )}`}</Text>
          {getWeatherIcon(weatherData.weather[0].main)}
          <Text style={styles.temp}>
            {kelvinToCelsius(weatherData.main.temp)}°C
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  weather_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  weather_title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 30,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});
