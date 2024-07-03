import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../../components/ProductCard';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { AirbnbRating } from 'react-native-ratings';

const dummyProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the description for product 1.',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    rating: 4.5,
    reviews: [
      { id: 1, user: 'Alice', comment: 'Great product!' },
      { id: 2, user: 'Bob', comment: 'Good value for money.' },
    ],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the description for product 2.',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    rating: 3.8,
    reviews: [
      { id: 3, user: 'Charlie', comment: 'Not bad, but could be better.' },
    ],
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is the description for product 3.',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    rating: 5.0,
    reviews: [
      { id: 4, user: 'Diana', comment: 'Absolutely fantastic!' },
      { id: 5, user: 'Eve', comment: 'Exceeded my expectations.' },
    ],
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is the description for product 4.',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    rating: 4.2,
    reviews: [
      { id: 6, user: 'Frank', comment: 'Very good product.' },
    ],
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is the description for product 5.',
    price: 59.99,
    image: 'https://via.placeholder.com/150',
    rating: 3.5,
    reviews: [
      { id: 7, user: 'Grace', comment: 'It’s okay.' },
    ],
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'This is the description for product 6.',
    price: 69.99,
    image: 'https://via.placeholder.com/150',
    rating: 4.8,
    reviews: [
      { id: 8, user: 'Hannah', comment: 'Highly recommend!' },
    ],
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'This is the description for product 7.',
    price: 79.99,
    image: 'https://via.placeholder.com/150',
    rating: 4.0,
    reviews: [
      { id: 9, user: 'Ian', comment: 'Good quality.' },
    ],
  },
];

const Home = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);  // State for the selected product
  const [isModalVisible, setIsModalVisible] = useState(false);  // State for the modal visibility

  const toggleLayout = () => {
    setIsGrid(!isGrid);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeProductDetails = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
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
                onPress={() => openProductDetails(item)}  // Pass the product to openProductDetails
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            key={isGrid ? 'G' : 'L'}
            numColumns={isGrid ? 2 : 1}
            contentContainerStyle={styles.listContent}
          />

          {/* Product Details Modal */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeProductDetails}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.modalScrollView}>
                  {selectedProduct && (
                    <>
                      <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                      <Image
                        source={{ uri: selectedProduct.image }}
                        style={styles.modalImage}
                      />
                      <AirbnbRating
                        count={5}
                        defaultRating={selectedProduct.rating}
                        size={20}
                        isDisabled
                        showRating={false}
                        starContainerStyle={styles.ratingContainer}
                      />
                      <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                      <Text style={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</Text>
                      <Text style={styles.modalReviewsTitle}>Customer Reviews:</Text>
                      {selectedProduct.reviews.map(review => (
                        <View key={review.id} style={styles.reviewContainer}>
                          <Text style={styles.reviewUser}>{review.user}:</Text>
                          <Text style={styles.reviewComment}>{review.comment}</Text>
                        </View>
                      ))}
                    </>
                  )}
                </ScrollView>
                <TouchableOpacity onPress={closeProductDetails} style={styles.closeButton}>
                  <Icon name="close" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalScrollView: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  modalReviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewComment: {
    marginLeft: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Home;
