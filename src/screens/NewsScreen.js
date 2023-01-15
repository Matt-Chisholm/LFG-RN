import { View, Text, FlatList } from "react-native";
import React from "react";
import { API_KEY } from "@env";
import axios from "axios";

export default function NewsScreen() {
  const [news, setNews] = React.useState([]);
  const sources = "cbc-news, globe-and-mail, the-globe-and-mail";

  React.useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${API_KEY}`;
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
    <View>
      <Text>News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
