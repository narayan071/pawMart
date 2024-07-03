import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';

const Cart = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const getSubtotal = () => {
    return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity: state.items.find(item => item.id === id).quantity + 1 } });
  };

  const handleDecreaseQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    if (item.quantity > 1) {
      dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity: item.quantity - 1 } });
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
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
        <Text style={styles.subtotal}>Subtotal: ${getSubtotal().toFixed(2)}</Text>
        {getSubtotal() === 0 ? (
          <CustomButton 
            title="Add Items"
            color="primary"
            size="medium"
            onPress={()=>router.push('/Home')}
          />
        ) : (
          <CustomButton 
            title="Checkout" 
            color="primary" 
            size="medium" 
            onPress={() => alert('Proceed to Checkout')} 
          />
        )}
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
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Cart;
