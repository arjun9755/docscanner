import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoader} = loaderSlice.actions;
export default loaderSlice.reducer;
