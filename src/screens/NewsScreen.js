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
    "cbc-news, globe-and-mail, the-globe-and-mail, ctv-news, global-news, cbc-news, ctv-news, ctv-news-channel, ctv-news-at-11, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-12, ctv-news-at-1, ctv-news-at-2, ctv-news-at-3, ctv-news-at-4, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-11, ctv-news-at-12, ctv-news-at-1, ctv-news-at-2, ctv-news-at-3, ctv-news-at-4, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-11, ctv-news-at-12, ctv-news-at-1, ctv-news-at-2, ctv-news-at-3, ctv-news-at-4, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-11, ctv-news-at-12, ctv-news-at-1, ctv-news-at-2, ctv-news-at-3, ctv-news-at-4, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-11, ctv-news-at-12, ctv-news-at-1, ctv-news-at-2, ctv-news-at-3, ctv-news-at-4, ctv-news-at-5, ctv-news-at-6, ctv-news-at-7, ctv-news-at-8, ctv-news-at-9, ctv-news-at-10, ctv-news-at-11, ctv-news-at-12, ctv-news-at-1, ctv-news-at";
  const limit = 6;

  React.useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${API_KEY}&pageSize=${limit}`;
    axios
      .get(url)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.news_container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "purple" }}>
        Today in Canada
      </Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return (
            <View style={styles.article_container}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.articles}>{item.title}</Text>
                <Image
                  style={{
                    width: 250,
                    height: 150,
                    borderRadius: 10,
                    marginLeft: 30,
                  }}
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
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 10,
    backgroundColor: "#e1fff5",
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
