import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import NewsScreen from "./src/screens/NewsScreen";
import WeatherScreen from "./src/screens/WeatherScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='News' component={NewsScreen} />
    </Stack.Navigator>
  );
}

function WeatherStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Weather' component={WeatherScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='News' component={NewsStack} />
        <Tab.Screen name='Weather' component={WeatherStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
