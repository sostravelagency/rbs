import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const handleAddToCart = () => {
    const cart = global.cart || [];
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    global.cart = cart;
  };
  return (
    <View>
      <Image alt={""} source={{uri: product.image}} style={{width: 200, aspectRatio: 2 / 3}} />
      <Text style={{fontSize: 18, padding: 12}}>Name: {product.name}</Text>
      <Text style={{fontSize: 18, padding: 12}}>Price: ${product.price}</Text>
      <Text style={{fontSize: 18, padding: 12}}>Description: {product.description}</Text>
      <Button title="Add to cart" onPress={handleAddToCart} style={{padding: 12}} />
    </View>
  );
};

export default ProductDetailScreen;