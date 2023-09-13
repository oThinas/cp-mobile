/** Core */
import { StyleSheet, View } from 'react-native';

/** Components */
import { TextComponent } from '..';

/** Props */
import { IMessageProps } from './message.props';
import { colors } from '../../core';

export function MessageComponent(props: IMessageProps) {
  if (props.role === 'system') {
    return;
  }

  return (
    <View style={[styles.container, styles[props.role as 'user' | 'assistant']]}>
      <TextComponent additionalStyles={styles.text}>
        {props.content}
      </TextComponent>
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
});
