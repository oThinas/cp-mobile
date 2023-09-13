/** Core */
import { FunctionComponent } from 'react';
import { IconProps } from 'phosphor-react-native';
import * as Icon from 'phosphor-react-native';

/** Props */
import { IIconComponentProps } from './icon.props';

export function IconComponent(props: IIconComponentProps) {
  const IconSlot = Icon[props.iconName] as FunctionComponent<IconProps>;

  return (
    <IconSlot {...props} />
  );
}
