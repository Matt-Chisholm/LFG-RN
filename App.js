import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import NewsScreen from "./src/screens/NewsScreen";
import WeatherScreen from "./src/screens/WeatherScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Trending") {
              iconName = "book-open";
            } else if (route.name === "Weather") {
              iconName = "cloud";
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        })}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Trending' component={NewsScreen} />
        <Tab.Screen name='Weather' component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
