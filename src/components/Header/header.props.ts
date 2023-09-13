import { MainNavigatorParamList, NavigationProps } from '../../core';

export interface IHeaderProps {
  title: string;
  navigation: NavigationProps<keyof MainNavigatorParamList>['navigation'];
}
