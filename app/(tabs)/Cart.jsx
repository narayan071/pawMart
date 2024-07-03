import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>item price: ${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemSubtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
      <CustomButton
        title="Remove"
        color="secondary"
        size="medium"
        onPress={() => handleRemoveFromCart(item.id)}
      />
    </View>
  );

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Proceed to checkout');
  };

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
        <Text style={styles.totalText}>Total: ${getSubtotal().toFixed(2)}</Text>
        <View >
          {getSubtotal() === 0 ? (
            <CustomButton 
              title="Add Items"
              color="primary"
              size="medium"
              onPress={() => router.push('/Home')}
            />
          ) : (
            <CustomButton 
              title="Checkout" 
              color="primary" 
              size="medium" 
              onPress={handleCheckout} 
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center'
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 100,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 5,
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
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  
});

export default Cart;
