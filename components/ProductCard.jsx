import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import { useCart } from '../app/context/CartContext';
import { AirbnbRating } from 'react-native-ratings';

const ProductCard = ({ product, isGrid, onPress }) => {
  const { dispatch } = useCart(); 

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <TouchableOpacity 
      onPress={onPress}  // Added onPress prop to handle clicks
      style={[styles.card, isGrid ? styles.gridCard : styles.listCard]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={isGrid ? styles.gridImage : styles.listImage}
        />
        <TouchableOpacity style={isGrid ? styles.gridHeartIcon : styles.listHeartIcon}>
          <Icon
            name="heart-outline"
            size={20}
            color='gray'
          />
        </TouchableOpacity>
      </View>
      <View style={isGrid ? styles.gridContent : styles.listContent}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              defaultRating={product.rating}
              size={15}
              isDisabled
              showRating={false}
            />
          </View>
          <CustomButton
            title="Add to Cart"
            color="secondary"
            size="small"
            onPress={handleAddToCart} 
            style={styles.addToCartBtn}  // Added the style here
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  descriptionContainer: {
    flexDirection: "column",
    alignItems: 'center',  
  },
  gridCard: {
    width: "45%",
  },
  listCard: {
    width: "95%",
    flexDirection: "row",
  },
  gridImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  listImage: {
    width: 130,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  listContent: {
    flexDirection: "column",
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addToCartBtn: {
    marginTop: 10,  // Ensures space between rating and button
  },
  imageContainer: {
    position: "relative",
  },
  gridHeartIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
  },
  listHeartIcon: {
    position: "absolute",
    top: 5,
    right: 20,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
  },
});

export default ProductCard;
