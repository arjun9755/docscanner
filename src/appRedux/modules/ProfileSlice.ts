import {Languages, UserTypes} from '@types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ASYNC_KEY, removeAsyncData, setAsyncData} from '@common';
import {onChangeLanguage} from '@i18n';

interface ProfileState {
  userData: UserTypes;
  language: Languages;
  isLogIn: boolean;
}

export const initialState: ProfileState = {
  userData: {
    _id: '',
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: 0,
    created_at: '',
    __v: 0,
    token: '',
    resetToken: '',
    device_info: '',
    device_os_version: '',
    device_type: '',
  },
  language: 'en',
  isLogIn: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserTypes>) => {
      state.userData = action.payload;
      state.isLogIn = true;
      setAsyncData(ASYNC_KEY.USER, action.payload);
    },
    resetUserData: state => {
      state.isLogIn = false;
      state.userData = initialState.userData;
      removeAsyncData(ASYNC_KEY.USER);
    },
    setLanguage: (state, action: PayloadAction<Languages>) => {
      state.language = action.payload;
      onChangeLanguage(action.payload);
    },
  },
});

export const {setUserData, resetUserData, setLanguage} = profileSlice.actions;

export default profileSlice.reducer;
