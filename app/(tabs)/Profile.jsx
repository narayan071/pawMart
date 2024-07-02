import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save profile data
  };

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(value) => handleChange('name', value)}
              />
            ) : (
              <Text style={styles.value}>{profile.name}</Text>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(value) => handleChange('email', value)}
              />
            ) : (
              <Text style={styles.value}>{profile.email}</Text>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(value) => handleChange('phone', value)}
              />
            ) : (
              <Text style={styles.value}>{profile.phone}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <CustomButton title="Save" color="primary" onPress={handleSave} />
            ) : (
              <CustomButton title="Edit" color="primary" onPress={handleEditToggle} />
            )}
          </View>
        </View>
        <View style={{marginTop: 150}} >
          <CustomButton 
            title="Logout"
            color="secondary"
            size="large"
            onPress={()=>router.push('/Login')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});

export default Profile;
