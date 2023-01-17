import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HomeScreen() {
  const getMonth = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + " " + getMonth(month) + " " + year; //format: d-m-y;
  };

  const getCurrentTime = () => {
    var hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours <= 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{getCurrentTime()}</Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>
      </View>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginLeft: 30,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  date: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 30,
    color: "grey",
  },
  headerContainer: {
    alignItems: "left",
    justifyContent: "left",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
  },
});
