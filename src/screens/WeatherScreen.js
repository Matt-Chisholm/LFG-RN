import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { WEATHER_KEY } from "@env";
import { Feather } from "@expo/vector-icons";

export default function WeatherScreen() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      if (!location) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}`;
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
        setErrorMsg(error);
      }
    }
    fetchWeather();
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

  const searchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a city</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        placeholder='City'
      />
      <Button
        title='Search'
        onPress={() => searchWeather(search)}
        style={{ marginBottom: 20 }}
      />
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {!weatherData && !errorMsg && (
        <View>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text style={styles.description}>Loading your local weather</Text>
        </View>
      )}
      {weatherData && (
        <View style={styles.weather_container}>
          {search === "" && <Text style={styles.title}>Current Location</Text>}
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "purple",
  },
  weather_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
  input: {
    height: 40,
    width: 200,
    margin: 22,
    borderWidth: 1,
    padding: 10,
  },
});
