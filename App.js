import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import Pokedex from './screens/Pokedex';
import Profile from './screens/Profile';
import { initDatabase } from './utils/database';

const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    initDatabase()
      .then(() => console.log('Database initialized successfully'))
      .catch(error => console.error('Failed to initialize database:', error));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Pokedex" component={Pokedex}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}