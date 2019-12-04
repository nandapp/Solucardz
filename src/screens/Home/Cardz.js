import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SideMenuButton from '../../components/SideMenuButton';
import {Header} from 'react-native-elements';
import CardListItem from '../../components/CardListItem';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-elements';

const Cardz = props => {
  const {name, email, designation, avatar} = useSelector(
    state => state.cards.userDetails,
  );
  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        backgroundColor="white"
        leftComponent={<SideMenuButton navigation={props.navigation} />}
        centerComponent={
          <Image
                            source={require("../../../assets/images/Logo.png")}
                            style={{width:75, height:25}}
                            containerStyle={{alignSelf:'center'}}
                        />
        }
        rightComponent={{icon: 'home', color: 'darkblue'}}
      />
      <CardListItem
        name={name}
        designation={designation}
        email={email}
        avatar={avatar}
        navigation={props.navigation}
      />
    </View>
  );
};
export default Cardz;
