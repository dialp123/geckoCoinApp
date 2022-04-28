import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";

import CoinItem from "./component/CoinItem";

const App = () => {
  //array de datos de todas las monedas
  const [coins, setCoins] = useState([]);
  //coin input search
  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  //consume la api de gecko y trae los objetos de cada moneda y sus caracteristicas
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.title}>GeckoCoinApp</Text>
        <Icon
          name="reload"
          type="material-community"
          color="white"
          style={styles.icon}
          onPress={async () => {
            await loadData();
            console.log("Coins actualizados");
          }}
        ></Icon>
        <TextInput
          style={styles.searchInput}
          placeholder={"Search coin"}
          placeholderTextColor="#858585"
          onChangeText={(text) => {
            setSearch(text);
          }}
        ></TextInput>
      </View>
      <FlatList
        style={styles.list}
        data={
          //filtra la monedas por las que contengan el string search
          //toLowerCase combierte cualquier string a minudculas
          coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search) ||
              coin.symbol.toLowerCase().includes(search)
          )
        }
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
        showsVerticalScrollIndicator={false}
        //activa la funcion onRefresh del faltList
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  searchInput: {
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#4657CE",
    width: "40%",
    textAlign: "center",
  },
  list: {
    width: "90%",
  },
  title: {
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  icon: {
    marginTop: 15,
  },
});

export default App;
