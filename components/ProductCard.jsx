import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "./CustomButton";
import { useCart } from "../app/context/CartContext";

const ProductCard = ({ product, isGrid }) => {
  const { dispatch } = useCart(); 

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <View style={[styles.card, isGrid ? styles.gridCard : styles.listCard]}>
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
          <CustomButton
            title="Add to Cart"
            color="secondary"
            size="small"
            onPress={handleAddToCart} 
          />
        </View>
      </View>
    </View>
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
  addToCartBtn: {
    backgroundColor: "gold",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    marginTop:10
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
