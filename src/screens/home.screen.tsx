/** Core */
import { StyleSheet, View } from 'react-native';
import { NavigationProps, colors } from '../core';

/** Components */
import { BaseScreenComponent, ButtonComponent, TitleComponent } from '../components';

/** Utils */
import { handleNavigate } from '../utils';

export function Home({ navigation }: NavigationProps<'Home'>) {
  return (
    <BaseScreenComponent style={styles.container}>
      <View style={styles.title}>
        <TitleComponent>
          Soul
        </TitleComponent>

        <TitleComponent additionalStyles={styles.span}>
          Coderz
        </TitleComponent>
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonComponent onPress={() => handleNavigate('Login', navigation)}>
          Login
        </ButtonComponent>

        <ButtonComponent type='secondary' onPress={() => handleNavigate('Register', navigation)}>
          Cadastro
        </ButtonComponent>
      </View>
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: { flexDirection: 'row' },
  span: { color: colors.primary },
  buttonsContainer: { gap: 16 },
});
