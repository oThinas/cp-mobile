/** Core */
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../core';

/** Props */
import { IButtonProps } from './button.props';
import { TextComponent } from '..';

export function ButtonComponent({ type = 'primary', ...props }: IButtonProps) {
  const buttonStyle = type === 'icon' ? {} : [style.container, style[type], props.additionalStyles];

  return (
    <TouchableOpacity activeOpacity={0.75} style={buttonStyle} {...props}>
      <TextComponent>
        {props.children}
      </TextComponent>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  secondary: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  icon: { padding: 0 },
});
