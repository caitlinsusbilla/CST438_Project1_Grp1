import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{flex: 1, backgroundColor: "#F0EAD6", padding: 100 }}>
            
            <Button title="Login" onPress={() => console.log("Welcome")} color="#e92929"/>
            <Button title="Create Account" onPress={() => console.log("Welcome")} color="#e92929"/>
            <Button title="Go to Pokedex" onPress={() => navigation.navigate("Pokedex")}/>
            <Button title="Profile" onPress={() => navigation.navigate("Profile")}/>
        </View>
    );
}
