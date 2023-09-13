/** Core */
import { TouchableOpacityProps } from 'react-native';

export interface IButtonProps extends TouchableOpacityProps {
  children: string | JSX.Element;
  type?: 'primary' | 'secondary' | 'icon';
  additionalStyles?: TouchableOpacityProps['style'];
}
