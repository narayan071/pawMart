import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext'; 
import CustomButton from '../../components/CustomButton';  
const Cart = () => {
  const { state, dispatch } = useCart();  

  const handleRemoveFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });  
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {state.items.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={state.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.footer}>
        <CustomButton 
          title="Checkout" 
          color="primary" 
          size="medium" 
          onPress={() => alert('Proceed to Checkout')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});

export default Cart;
