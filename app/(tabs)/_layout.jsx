import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartProvider } from '../context/CartContext';

const TabIcon = ({ iconName, label, color, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={iconName} size={24} color={color} />
      <Text style={{ color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}>
        {label}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <CartProvider>
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="home-outline" label="Home" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            title: 'Cart',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="cart-outline" label="Cart" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Orders"
          options={{
            title: 'Orders',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="list-outline" label="Orders" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="person-outline" label="Profile" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
    </CartProvider>
  );
};

export default TabLayout;
