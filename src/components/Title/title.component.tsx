/** Core */
import { StyleSheet } from 'react-native';
import { fonts } from '../../core';

/** Components */
import { TextComponent } from '..';

/** Props */
import { ITitleProps } from './title.props';

export function TitleComponent(props: ITitleProps) {
  return (
    <TextComponent additionalStyles={[styles.title, props.additionalStyles]}>
      {props.children}
    </TextComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 44,
  },
});
