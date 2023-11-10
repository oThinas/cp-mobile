/** Core */
import { useEffect, useRef } from 'react';
import { FlatList, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { colors } from '../core';

/** Components */
import { BaseScreenComponent, ButtonComponent, IconComponent, MessageComponent, TextComponent } from '../components';

/** API */
import { messageApi } from '../api';

/** Reducers */
import { addMessage, setMessages } from '../reducers';

/** Storage */
import { storage } from '../lib';

/** Hooks */
import { useAppDispatch, useAppSelector } from '../hooks';

/** Interfaces */
import { IMessage } from '../interfaces';

export function Chat() {
  const messages = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue } = useForm<{ chatMessage: string }>();
  const textInputRef = useRef<TextInput>(null);
  Keyboard.addListener('keyboardDidHide', () => textInputRef.current?.blur());

  useEffect(() => {
    function fetchMessages() {
      storage.load({ key: 'messages' })
        .then((messages: IMessage[]) => dispatch(setMessages(messages)))
        .catch(async () => {
          const messages = await messageApi.getMessages();
          dispatch(setMessages(messages));
        });
    }

    fetchMessages();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!data.chatMessage.trim()) {
      return;
    }

    textInputRef.current?.blur();

    const newMessage: IMessage = {
      content: data.chatMessage,
      role: 'user',
    };

    setValue('chatMessage', '');

    const response = await messageApi.sendMessage(newMessage);
    dispatch(addMessage(newMessage));
    dispatch(addMessage(response));

    storage.save({ key: 'messages', data: [messages] });
  });

  function handleClearMessages() {
    dispatch(setMessages([]));
    storage.remove({ key: 'messages' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonComponent type='icon' disabled>
          <IconComponent iconName='Trash' weight='fill' color={colors.background.secondary} />
        </ButtonComponent>

        <TextComponent>
          {user.name}
        </TextComponent>

        <ButtonComponent type='icon' onPress={() => handleClearMessages()}>
          <IconComponent iconName='Trash' weight='fill' />
        </ButtonComponent>
      </View>

      <BaseScreenComponent style={styles.main}>
        <FlatList
          data={messages}
          keyExtractor={(__, index) => String(index)}
          renderItem={({ item }) => (
            <MessageComponent content={item.content} role={item.role} />
          )}
        />

        <View style={styles.input}>
          <Controller
            control={control}
            name='chatMessage'
            render={({ field: { value, onChange } }) => (
              <TextInput
                ref={textInputRef}
                onChangeText={(value) => onChange(value)}
                value={value}
                multiline
                placeholder='Digite sua mensagem...'
                placeholderTextColor={colors.white}
                style={styles.field}
              />
            )}
          />

          <ButtonComponent type='icon' onPress={onSubmit}>
            <IconComponent iconName='PaperPlaneRight' />
          </ButtonComponent>
        </View>
      </BaseScreenComponent>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  main: {
    width: '100%',
    paddingBottom: 8,
  },
  input: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  field: {
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    padding: 8,
    color: colors.white,
    fontSize: 20,
    flex: 1,
  },
});
