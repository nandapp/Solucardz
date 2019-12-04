import AsyncStorage from '@react-native-community/async-storage';

/*
 * Helper function to check if user is logged in by checking AsyncStorage
 */
export async function checkLoggedIn(navigation, callback) {
  try {
    const user = await AsyncStorage.getItem('user');
    const userID = await AsyncStorage.getItem('userID');
    if (user !== null && userID !== null) {
      callback(JSON.parse(user), JSON.parse(userID));
    } else {
      navigation.navigate('Login');
    }
  } catch (error) {
    console.log(error);
    navigation.navigate('Login');
  }
}

/*
 * Helper function to get user ID from AsyncStorage
 */
export async function getUserIdFromAsyncStorage(callback) {
  try {
    const userId = await AsyncStorage.getItem('userID');
    if (userId !== null) {
      callback(JSON.parse(userId));
    }
  } catch (error) {
    console.log(error);
  }
}
