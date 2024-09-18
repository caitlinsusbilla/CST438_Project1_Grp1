import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import LoginModal from '../modals/LoginModal';

export default function HomeScreen({ navigation }) {
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
        <View style={styles.container}>
            {!user ? (
                <Button title="Sign In" onPress={openModal} color="#e92929" testID = "SignIn"/>
            ) : (
                <>
                    <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
                    <Button title="Go to Pokedex" onPress={() => navigation.navigate("Pokedex")} color="#e92929"/>
                    <Button title="Profile" onPress={() => navigation.navigate("Profile")} color="#e92929"/>
                    <Button title="My Party" onPress={() => navigation.navigate("MyParty")} color="#e92929"/>
                    <Button title="Logout" onPress={handleLogout} color="#e92929"/>
                </>
            )}
            
            {/* Keep View Database button always visible */}
            <Button title="View Database" onPress={() => navigation.navigate("DatabaseView")} color="#4a90e2"/>

            {modalVisible && (
                <LoginModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    onLoginSuccess={handleLoginSuccess}
                    testID="LoginModal"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F0EAD6",
        padding: 20,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginVertical: 10,
        width: '100%',
    },
});