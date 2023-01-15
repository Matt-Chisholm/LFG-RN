import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { API_KEY } from "@env";
import axios from "axios";

export default function NewsScreen() {
  const [news, setNews] = React.useState([]);
  const sources =
    "cbc-news, globe-and-mail, the-globe-and-mail, ctv-news, global-news";
  const limit = 6;

  React.useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${API_KEY}&pageSize=${limit}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.news_container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Today in Canada</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return (
            <View style={styles.article_container}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.articles}>{item.title}</Text>
                <Image
                  style={{ width: 300, height: 200, borderRadius: 10 }}
                  source={{ uri: item.urlToImage }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  news_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 40,
  },
  articles: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: 10,
    margin: 10,
  },
  article_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  flat_list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
