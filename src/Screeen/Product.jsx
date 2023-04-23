import React, {useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList, TouchableHighlight, Image } from "react-native";
// import { Icon, ListItem } from "react-native-elements";
import { products } from "../dummy";
import { LogBox } from 'react-native';
import Icons from "react-native-vector-icons/MaterialIcons"

const ProductsScreen = ({ route, navigation }) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
  const { category } = route.params;
  const productsOfCategory = products.filter(
    (product) => product.category === category.name
  );
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = global.favorites || [];
    setFavorites(favorites);
  }, []);

  const isFavorite = (product) =>
    favorites.some((item) => item.id === product.id);

  const toggleFavorite = (product) => {
    const favorites = global.favorites || [];
    const itemIndex = favorites.findIndex((item) => item.id === product.id);
    if (itemIndex > -1) {
      favorites.splice(itemIndex, 1);
    } else {
      favorites.push(product);
    }
    global.favorites = favorites;
    setFavorites(favorites);
  };
  return (
    <View>
      <ScrollView>
        <FlatList data={productsOfCategory} renderItem={({item, index})=> <TouchableHighlight onPress={() => navigation.navigate('ProductDetail', { product: item })} underlayColor={"#2e89ff"} style={{backgroundColor: "#fff", padding: 12, borderBottomColor: "#e7e7e7", borderStyle: "solid", borderBottomWidth: 1}} key={index}>
            <View>
                <Image alt={""} source={{uri: item.image}} style={{width: 200, aspectRatio: 2 / 3}} />
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text onPress={() => toggleFavorite(item)}>
                    {isFavorite(item) ? <Icons name="star" size={20} color={"orange"} /> : <Icons name={"star-border"} size={20} color={"orange"} />}
                </Text>
            </View>
        </TouchableHighlight>} />
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;
