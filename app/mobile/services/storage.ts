import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@rollo_session';

export async function setStorageItem(value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch (error) {
    console.error('setStorageItem error:', error);
    return false;
  }
}

export async function getStorageItem(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('getStorageItem error:', error);
    return null;
  }
}

export async function removeStorageItem(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('removeStorageItem error:', error);
    return false;
  }
}
