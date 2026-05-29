import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * Authentication stack routes
 * Used for screens before user login/authentication
 */
export type AuthStackParamList = {
  LogIn: undefined;
};

/**
 * Main application stack routes
 * Contains app-level screens and nested navigators
 */
export type AppStackParamList = {
  // https://reactnavigation.org/docs/typescript#nesting-navigators
  TabNavigation?: NavigatorScreenParams<TabScreenRouteProp>;
  ModalScreen: undefined;
};

/**
 * Bottom tab navigator routes
 */
export type TabScreenRouteProp = {
  Home: undefined;
  Profile: undefined;
};

/**
 * Screen props type for Auth stack screens
 *
 * Example:
 * type Props = AuthStackScreenProps<'LogIn'>
 */
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

/**
 * Screen props type for App stack screens
 *
 * Example:
 * type Props = AppStackScreenProps<'ModalScreen'>
 */
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

/**
 * Screen props type for Bottom Tab screens
 *
 * Example:
 * type Props = TabNavigationScreenProps<'Home'>
 */
export type TabNavigationScreenProps<T extends keyof TabScreenRouteProp> =
  BottomTabScreenProps<TabScreenRouteProp, T>;

/**
 * Combined screen props type
 *
 * Used when a Tab screen also needs access
 * to AppStack navigation methods/screens
 *
 * Example:
 * type Props = TabNavigationWithAppStackScreenProps<'Home'>
 */
export type TabNavigationWithAppStackScreenProps<
  T extends keyof TabScreenRouteProp,
> = CompositeScreenProps<
  BottomTabScreenProps<TabScreenRouteProp, T>,
  NativeStackScreenProps<AppStackParamList, keyof AppStackParamList>
>;

/**
 * User model type
 * Represents logged-in user data received from API
 */
export type UserTypes = {
  _id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: number;
  created_at: string;
  __v: number;
  resetToken: string;
  device_info: string;
  device_os_version: string;
  device_type: string;
  token: string;
};

/**
 * User Language type
 * Represents user selected language
 */
export type Languages = 'en' | 'es' | 'hi';

/**
 * Common API response structure
 *
 * @template Data - Expected response data type
 */
export type ApiResponseType<Data = any> = {
  success: boolean;
  data?: Data | null;
  status: number;
  message: string;
};

/**
 * Login API request payload
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Login API response data
 */
export interface LoginResponse {
  user: UserTypes;
  token: string;
}
