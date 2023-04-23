import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screeen/Home';
import ProductsScreen from './src/Screeen/Product';
import ProductDetailScreen from './src/Screeen/ProductDetail';
import CartScreen from './src/Screeen/Cart';
import { useState, useRef } from 'react';
import Icons from "react-native-vector-icons/MaterialIcons"
import Drawer from 'react-native-drawer';
import { products } from './src/dummy';

const Stack = createStackNavigator();

const DrawerContent = ({ closeDrawer }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, marginVertical: 10 }}>All Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View>
          <Text style={{fontSize: 18, padding: 12}}>Name: {item.name}</Text>
          <Text style={{fontSize: 18, padding: 12}}>Price: ${item.price}</Text>
          <Text style={{fontSize: 18, padding: 12}}>Description: {item.description}</Text>
        </View>}
      />
    </View>
  );
};
export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const drawerRef = useRef(null); // thêm ref để lấy tham chiếu tới drawer

  // các hàm xử lý cartItem như bình thường

  // hàm mở drawer
  const [openDrawer, setOpenDrawer]= useState(false)
  // hàm đóng drawer
  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  return (
    <Drawer
      ref={drawerRef}
      content={<DrawerContent closeDrawer={closeDrawer} />}
      open={openDrawer}
      tapToClose={true}
      openDrawerOffset={0.2}
      panCloseMask={0.2}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={({route, navigation})=> ({title: "Home Screen",headerRight: () => (
            <View style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}>
              <TouchableOpacity onPress={() => setOpenDrawer(prev=> !prev)}>
                <Icons name="menu" size={24} color="black" style={{ marginRight: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Icons name="shopping-cart" size={24} color="black" style={{ marginRight: 20 }} />
              </TouchableOpacity>
            </View>
          ),})} />
          <Stack.Screen name="Product" component={ProductsScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen
            name="Cart"
            options={{ title: 'Cart', headerRight: () => <Icons size={20} style={{marginRight: 12}} name={"shopping-cart"} /> }}
          >
            {(props) => <CartScreen {...props} cartItems={cartItems} removeFromCart={removeFromCart} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
