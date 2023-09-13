/** Core */
import { StyleSheet, View } from 'react-native';

/** Components */
import { ButtonComponent, IconComponent, TitleComponent } from '..';

/** Props */
import { IHeaderProps } from './header.props';

export function HeaderComponent(props: IHeaderProps) {
  function handleGoBack() {
    props.navigation.goBack();
  }

  return (
    <View style={styles.header}>
      <ButtonComponent type='icon' onPress={() => handleGoBack()}>
        <IconComponent iconName='CaretLeft' weight='bold' />
      </ButtonComponent>

      <TitleComponent>
        {props.title}
      </TitleComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
