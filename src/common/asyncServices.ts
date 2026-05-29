import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {}
};

export const getAsyncData = async (key: string) => {
  let data = null;
  try {
    const res: any = await AsyncStorage.getItem(key);
    data = JSON.parse(res);
  } catch (e) {}
  return data;
};

export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};

export const removeMultipleAsyncData = async (keys: string[]) => {
  try {
    await AsyncStorage.removeMany(keys);
  } catch (e) {}
};

export const clearAsyncData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {}
};

// ASYNC KEY
export const ASYNC_KEY = {
  USER: 'user',
  LANGUAGE: 'language',
};
