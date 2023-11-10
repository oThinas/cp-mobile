/** Core */
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { IconContext } from 'phosphor-react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';
import { MainNavigator, colors } from './src/core';

/** Store */
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            colors: {
              background: colors.background.primary,
              primary: colors.primary,
              card: '',
              text: colors.white,
              border: '',
              notification: '',
            },
            dark: true,
          }}
        >
          <IconContext.Provider
            value={{
              color: colors.white,
              weight: 'fill',
              size: 32,
            }}
          >
            <MainNavigator />

            <StatusBar barStyle='light-content' backgroundColor={colors.background.primary} translucent />
          </IconContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>

      <Toast config={{
        success(props) {
          return <SuccessToast {...props} text1Style={{ fontSize: 20 }} text2Style={{ fontSize: 16 }} />;
        },
        error(props) {
          return <ErrorToast {...props} text1Style={{ fontSize: 20 }} text2Style={{ fontSize: 16 }} />;
        },
      }} />
    </Provider>
  );
}
