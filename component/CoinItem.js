import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const CoinItem = (props) => {
  const { coin } = props;

  return (
    <View style={styles.containerItem}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: coin.image }} style={styles.images}></Image>
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View style={styles.containerPrice}>
        <Text style={styles.text}>$ {coin.current_price}</Text>
        <Text
          style={[
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  images: {
    width: 30,
    height: 30,
  },
  text: {
    color: "white",
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  containerPrice: {
    textAlign: "right",
  },
  priceUp: {
    color: "green",
  },
  priceDown: {
    color: "red",
  },
});

export default CoinItem;
