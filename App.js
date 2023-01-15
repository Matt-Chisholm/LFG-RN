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
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "News") {
              iconName = focused ? "file-text" : "file-text";
            } else if (route.name === "Weather") {
              iconName = focused ? "cloud" : "cloud";
            }

            // You can return any component that you like here!
            return <Feather name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='News' component={NewsScreen} />
        <Tab.Screen name='Weather' component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
