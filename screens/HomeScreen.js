import React, { useState } from 'react';
import { View, Text, Button, Pressable, Alert, Modal, StyleSheet} from 'react-native';
import LoginModal from '../modals/LoginModal';

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    return (
        <View style={{flex: 1, backgroundColor: "#F0EAD6", padding: 100 }}>
            
            <Button title="Login" 
            onPress={() => {console.log("Welcome");
            openModal()}} color="#e92929" />

            {/* Open Login Modal */}
            <LoginModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Button title="Create Account" onPress={() => console.log("Welcome")} color="#e92929"/>
            <Button title="Go to Pokedex" onPress={() => navigation.navigate("Pokedex")}/>
            <Button title="Profile" onPress={() => navigation.navigate("Profile")}/>
            <Button title="My Party" onPress={() => navigation.navigate("MyParty")}/>
        </View>
    );
}
