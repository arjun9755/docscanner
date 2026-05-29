import store, {dispatch, toggleLoader, resetUserData} from '@appRedux';
import {
  BASE_URL,
  clearAsyncData,
  prettyPrint,
  showDangerMessage,
} from '@common';
import axios from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// to intercept the request with bearer
axiosInstance.interceptors.request.use(
  async config => {
    try {
      const accessToken = store.getState().profile.userData.token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.headers['app-platform'] = Platform.OS;
      config.headers['app-version'] = DeviceInfo.getVersion();
    } catch (error) {
      console.warn('Failed to attach request headers:', error);
    }
    return config;
  },
  error => {
    prettyPrint({AXIOS_INSTANCE_INTERCEPTORS_REQUEST_USE_ERROR: error});
    return Promise.reject(error);
  },
);

// to intercept the response if response have auth issue than forcefully logout the user
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    prettyPrint({RESPONSE_ERROR: error});
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        showDangerMessage('Something went wrong! please login again');
        clearAsyncData();
        dispatch(resetUserData());
      } else if (status === 500) {
        showDangerMessage(
          `500 Internal Server Error on ${error.response?.config.url}`,
        );
      } else if (!error.response) {
        showDangerMessage('Network error. Please check your connection.');
      }
      dispatch(toggleLoader(false));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
