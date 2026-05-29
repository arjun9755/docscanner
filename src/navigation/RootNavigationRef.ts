import {
  createNavigationContainerRef,
  NavigationAction,
  PartialState,
  NavigationState,
} from '@react-navigation/native';
import {AuthStackParamList, AppStackParamList} from '@types';

export type RootStackParamList = AuthStackParamList & AppStackParamList;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
}

export function resetRoot(
  state?: PartialState<NavigationState> | NavigationState,
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}

export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}
