import React from 'react';
import {Icon} from 'react-native-elements';

const SideMenuButton = props => {
  return (
    <Icon
      color="darkblue"
      name="menu"
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default SideMenuButton;
