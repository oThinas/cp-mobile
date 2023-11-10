/** Core */
import { useState } from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

/** Components */
import { ButtonComponent, IconComponent, TextComponent } from '..';

/** Props */
import { IMessageProps } from './message.props';
import { colors } from '../../core';

export function MessageComponent(props: IMessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control } = useForm<{ feedback: string }>();

  if (props.role === 'system') {
    return;
  }

  function handleOpenFeedbackModal() {
    setIsModalOpen(true);
    console.log('abrindo modal de feedback');
  }

  function handleSendFeedback() {
    setIsModalOpen(false);
    console.log('enviando feedback');
  }

  return (
    <View style={[styles.container, styles[props.role as 'user' | 'assistant']]}>
      <TextComponent additionalStyles={styles.text}>
        {props.content}
      </TextComponent>

      <View style={styles.reportButton}>
        {props.role === 'assistant' && (
          <ButtonComponent type='icon' onPress={() => handleOpenFeedbackModal()}>
            <IconComponent iconName='MegaphoneSimple' weight='regular'/>
          </ButtonComponent>
        )}
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.form}>
            <TextComponent additionalStyles={{ textAlign: 'center' }}>
              O que você achou da resposta?
            </TextComponent>

            <Controller
              control={control}
              name='feedback'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  style={styles.field}
                  multiline={true}
                  numberOfLines={4}
                  placeholder='Conte para nós seu feedback'
                  placeholderTextColor={colors.gray}
                />
              )}
            />

            <ButtonComponent onPress={() => handleSendFeedback()}>
              Enviar
            </ButtonComponent>

            <ButtonComponent additionalStyles={{ backgroundColor: colors.danger }} onPress={() => setIsModalOpen(false)}>
              Cancelar
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: '80%',
  },
  assistant: {
    backgroundColor: colors.background.secondary,
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  text: { fontSize: 20 },
  reportButton: { alignSelf: 'flex-end' },
  modalContainer: {
    flex: 1,
    backgroundColor: `${colors.background.primary}75`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    width: '80%',
    gap: 16,
  },
  field: {
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 8,
    color: colors.white,
    fontSize: 20,
    width: '100%',
    textAlignVertical: 'top',
  },
});
