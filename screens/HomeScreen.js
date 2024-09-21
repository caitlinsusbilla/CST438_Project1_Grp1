import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image, SafeAreaView } from 'react-native';
import LoginModal from '../modals/LoginModal';

const CustomButton = ({ title, onPress, color = '#ffffff' }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Created by Sabino Galindo, Enrique Rangel, Caitlin Susbilla, Adrian Haro</Text>
    <Text style={styles.footerText}>© 2024 PokeTeams</Text>
  </View>
);

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    Alert.alert('Success', `Welcome, ${loggedInUser.username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  return (
    <ImageBackground 
      source={require('../assets/PokeBack.png')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../assets/PokeTeams.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
          {!user ? (
            <CustomButton title="Sign In" onPress={openModal} />
          ) : (
            <View style={styles.buttonContainer}>
              <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
              <CustomButton title="Go to Pokedex" onPress={() => navigation.navigate("Pokedex")} />
              <CustomButton title="My Profile" onPress={() => navigation.navigate("Profile", {
                userId: user.id,
                username: user.username,
                userEmail: user.email,
              })} />
              <CustomButton title="My Party" onPress={() => navigation.navigate("MyParty")} />
              <CustomButton title="Logout" onPress={handleLogout} color="#e92929" />
            </View>
          )}
          
          <CustomButton title="View Database" onPress={() => navigation.navigate("DatabaseView")} />

          <LoginModal 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            onLoginSuccess={handleLoginSuccess}
          />
        </View>
        <Footer />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(240, 234, 214, 0.8)',
  },
  titleImage: {
    width: '90%',
    height: 100,
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,    
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
});