import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.error('Error storing user ID:', error);
  }
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};