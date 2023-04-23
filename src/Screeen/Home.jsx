import React, {useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { categories } from '../dummy';
import { LogBox } from 'react-native';
const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
  return (
    <View>
      <ScrollView style={{padding: 10}}>
        <FlatList data={categories} renderItem={({item, index})=> <TouchableHighlight onPress={() => navigation.navigate('Product', { category: item })} underlayColor={"#2e89ff"} style={{backgroundColor: item.bcolor, padding: 12, borderBottomColor: "#e7e7e7", borderStyle: "solid", borderBottomWidth: 1, marginBottom: 12, marginTop: 12}} key={index}>
            <Text style={{textAlign: "center", fontSize: 19}}>{item.name}</Text>
        </TouchableHighlight>} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;