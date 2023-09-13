/** Core */
import { useRef } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { NavigationProps, colors } from '../core';

/** Components */
import { BaseScreenComponent, ButtonComponent, HeaderComponent, TextComponent } from '../components';

/** API */
import { userApi } from '../api';

/** Hooks */
import { useAppDispatch } from '../hooks';

/** Reducers */
import { setUser } from '../reducers';

/** Utils */
import { handleNavigate } from '../utils';

/** Interfaces */
import { ILoginForm } from '../interfaces';

export function Login({ navigation }: NavigationProps<'Login'>) {
  const { control, handleSubmit } = useForm<ILoginForm>();
  const textInputRef = useRef<TextInput>(null);

  Keyboard.addListener('keyboardDidHide', () => textInputRef.current?.blur());

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    textInputRef.current?.blur();

    try {
      const user = await userApi.login(data.username, data.password);
      dispatch(setUser(user));
      handleNavigate('Chat', navigation);
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <BaseScreenComponent>
      <HeaderComponent navigation={navigation} title='Login' />

      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextComponent>
              Nome de usuário
            </TextComponent>

            <Controller
              control={control}
              name='username'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={textInputRef}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.field}
                  autoComplete='username'
                />
              )}
            />
          </View>

          <View style={styles.input}>
            <TextComponent>
              Senha
            </TextComponent>

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={textInputRef}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.field}
                  secureTextEntry
                  autoComplete='off'
                />
              )}
            />
          </View>
        </View>

        <View style={styles.action}>
          <ButtonComponent additionalStyles={styles.button} onPress={onSubmit}>
            Login
          </ButtonComponent>

          <View style={styles.warningContainer}>
            <TextComponent additionalStyles={styles.warning}>
              Ainda não possui login?
            </TextComponent>

            <TextComponent
              additionalStyles={[styles.warning, styles.underline]}
              onPress={() => handleNavigate('Register', navigation)}
            >
              Clique aqui
            </TextComponent>
          </View>
        </View>
      </View>
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 64,
  },
  inputContainer: {
    gap: 16,
    flex: 1,
    justifyContent: 'center',
  },
  input: { gap: 4 },
  field: {
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 8,
    color: colors.white,
    fontSize: 20,
    width: '100%',
  },
  action: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '75%',
    alignSelf: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  warning: { fontSize: 16 },
  underline: { textDecorationLine: 'underline' },
});
