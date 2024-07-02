import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../../components/ProductCard';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext'; 
const dummyProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the description for product 1.',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the description for product 2.',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is the description for product 3.',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is the description for product 4.',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is the description for product 5.',
    price: 59.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'This is the description for product 6.',
    price: 69.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'This is the description for product 7.',
    price: 79.99,
    image: 'https://via.placeholder.com/150',
  },
];

const Home = () => {
  const [isGrid, setIsGrid] = useState(true);

  const toggleLayout = () => {
    setIsGrid(!isGrid);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity onPress={toggleLayout} style={styles.iconButton}>
              <Icon name={'swap-horizontal-outline'} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyProducts}
            renderItem={({ item }) => (
              <ProductCard 
                product={item} 
                isGrid={isGrid} 
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            key={isGrid ? 'G' : 'L'}
            numColumns={isGrid ? 2 : 1}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 5,
  },
  listContent: {
    paddingBottom: 50,
  },
});

export default Home;
