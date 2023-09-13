/** Core */
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../../core';

/** Props */
import { ITextProps } from './text.props';

export function TextComponent(props: ITextProps) {
  return (
    <Text style={[styles.base, props.additionalStyles]} {...props}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.regular,
    fontSize: 24,
    color: colors.white,
    lineHeight: 32,
  },
});
