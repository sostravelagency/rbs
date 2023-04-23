import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableHighlight, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LogBox } from 'react-native';
const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const cart = global.cart || [];
      setCartItems(cart);
    });

    return unsubscribe;
  }, [navigation]);

  const total = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <View>
      <ScrollView>
        <FlatList data={cartItems} renderItem={({item, index})=> <TouchableHighlight onPress={() => navigation.navigate('ProductDetail', { product: item })} underlayColor={"#2e89ff"} style={{backgroundColor: "#fff", padding: 12, borderBottomColor: "#e7e7e7", borderStyle: "solid", borderBottomWidth: 1}} key={index}>
            <View>
              <Image alt={""} source={{uri: item.image}} style={{width: 200, aspectRatio: 2 / 3}} />
                <Text>{item.name}</Text>
                <Text>$${item.price}</Text>
            </View>
        </TouchableHighlight>} />
        
      </ScrollView>
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        <Text>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default CartScreen;