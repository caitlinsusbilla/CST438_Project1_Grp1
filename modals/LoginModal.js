import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUser, loginUser } from '../utils/database';
import { storeUserId } from '../utils/userUtils';

export default function LoginModal({ modalVisible, setModalVisible, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleSubmit = async () => {
    if (isCreatingAccount) {
      if (!username || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      try {
        const userId = await createUser(username, email, password);
        await storeUserId(userId);
        Alert.alert('Success', 'Account created successfully');
        setIsCreatingAccount(false);
        onLoginSuccess({ id: userId, username, email });
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Account already exists');
        console.error(error);
      }
    } else {
      if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password');
        return;
      }
      try {
        const user = await loginUser(username, password);
        if (user) {
          await storeUserId(user.id);
          onLoginSuccess(user);
          setModalVisible(false);
        } else {
          Alert.alert('Error', 'Invalid username or password');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to log in');
        console.error(error);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{isCreatingAccount ? 'Create Account' : 'Login'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            onChangeText={setUsername}
            value={username}
          />
          {isCreatingAccount && (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
          <Button title={isCreatingAccount ? 'Create Account' : 'Login'} onPress={handleSubmit} />
          <Button
            title={isCreatingAccount ? 'Switch to Login' : 'Create New Account'}
            onPress={() => setIsCreatingAccount(!isCreatingAccount)}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    color: 'black',
  }
});