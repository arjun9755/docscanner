import {configureStore} from '@reduxjs/toolkit';
import loaderSlice from './modules/LoaderSlice';
import profileSlice from './modules/ProfileSlice';
import {useDispatch, useSelector, useStore} from 'react-redux';

const store = configureStore({
  reducer: {
    loader: loaderSlice,
    profile: profileSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const dispatch = store.dispatch;
const getStore = store.getState;
export {dispatch, getStore};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export * from './modules/ProfileSlice';
export * from './modules/LoaderSlice';
export default store;
