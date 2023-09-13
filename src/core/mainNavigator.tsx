/** Core */
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';

/** Screens */
import { Chat, Home, Login, Register } from '../screens';

export type MainNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Chat: undefined;
}

export type NavigationProps<T extends keyof MainNavigatorParamList> = StackScreenProps<MainNavigatorParamList, T>;

export function MainNavigator() {
  const { Navigator, Screen } = createStackNavigator<MainNavigatorParamList>();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Screen name='Home' component={Home} />
      <Screen name='Login' component={Login} />
      <Screen name='Register' component={Register} />
      <Screen name='Chat' component={Chat} />
    </Navigator>
  );
}
