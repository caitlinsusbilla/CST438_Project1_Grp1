import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import Pokedex from './screens/Pokedex';
import Profile from './screens/Profile';
import MyParty from './screens/MyParty';
import { initDatabase } from './utils/database';
import DatabaseViewScreen from './screens/DatabaseViewScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => {
        console.log('Database initialized successfully');
        setIsDbReady(true);
      })
      .catch(error => console.error('Failed to initialize database:', error));
  }, []);

  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Initializing...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Pokedex" component={Pokedex}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="MyParty" component={MyParty}/>
        <Stack.Screen name="DatabaseView" component={DatabaseViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Install picker npm install @react-native-picker/picker
//Install npm install @react-native-async-storage/async-storage