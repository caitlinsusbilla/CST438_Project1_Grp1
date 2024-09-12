import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';


export default function LoginModal({ modalVisible, setModalVisible }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Integrate with database
    console.log('Username:', username);
    console.log('Password:', password);
    setModalVisible(false); // Close the modal after login
  }

  return(<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => { // Closes on close button
      setModalVisible(false);
    }}
  >

    {/* Modal View */}
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Submit" onPress={handleLogin} />
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    </View>
  </Modal>);
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});