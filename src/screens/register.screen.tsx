/** Core */
import { useRef } from 'react';
import { TextInput, Keyboard, View, StyleSheet, ScrollView } from 'react-native';
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
import { IRegisterForm } from '../interfaces';

export function Register({ navigation }: NavigationProps<'Register'>) {
  const { control, handleSubmit } = useForm<IRegisterForm>();
  const textInputRef = useRef<TextInput>(null);

  Keyboard.addListener('keyboardWillHide', () => textInputRef.current?.blur());

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    textInputRef.current?.blur();

    try {
      const user = await userApi.register(data);
      dispatch(setUser(user));
      handleNavigate('Chat', navigation);
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>
      <BaseScreenComponent>
        <HeaderComponent navigation={navigation} title='Cadastro' />

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
                Primeiro nome
              </TextComponent>

              <Controller
                control={control}
                name='name'
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    ref={textInputRef}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    style={styles.field}
                    autoComplete='name'
                  />
                )}
              />
            </View>

            <View style={styles.input}>
              <TextComponent>
                Sobrenome
              </TextComponent>

              <Controller
                control={control}
                name='surName'
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    ref={textInputRef}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    style={styles.field}
                    autoComplete='name-family'
                  />
                )}
              />
            </View>

            <View style={styles.input}>
              <TextComponent>
                Email
              </TextComponent>

              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    ref={textInputRef}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    style={styles.field}
                    autoComplete='email'
                    autoCapitalize='none'
                    keyboardType='email-address'
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

            <View style={styles.input}>
              <TextComponent>
                Confirme a senha
              </TextComponent>

              <Controller
                control={control}
                name='confirmPassword'
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
              Cadastrar
            </ButtonComponent>

            <View style={styles.warningContainer}>
              <TextComponent additionalStyles={styles.warning}>
                Já possui login?
              </TextComponent>

              <TextComponent
                additionalStyles={[styles.warning, styles.underline]}
                onPress={() => handleNavigate('Login', navigation)}
              >
                Clique aqui
              </TextComponent>
            </View>
          </View>
        </View>

      </BaseScreenComponent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  main: { gap: 32 },
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
