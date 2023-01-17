import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HomeScreen() {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: d-m-y;
  };

  return (
    <View>
      <Text style={styles.header}>Welcome to Victoria Weather & News App</Text>
      <Text style={styles.text}>
        This app is designed to provide you with the latest weather and news
        information for Victoria, BC.
      </Text>
      <Text style={styles.text}>
        To get started, please select the "Weather" or "News" tab at the bottom
        of the screen.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
