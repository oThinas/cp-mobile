/** Core */
import * as Icon from 'phosphor-react-native';

export interface IIconComponentProps extends Icon.IconProps {
  iconName: keyof typeof Icon;
}
