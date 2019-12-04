import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import  Entypo from 'react-native-vector-icons/Entypo';

const CustomHeaderButton = props => {
    return <HeaderButton 
    {...props} 
    IconComponent={ Entypo } 
    iconSize={22}  
    color='white'
    />
}

export default CustomHeaderButton;