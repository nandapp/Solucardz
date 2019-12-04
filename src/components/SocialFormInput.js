import {SocialIcon} from 'react-native-elements';
import React, {Component} from 'react';
import Colors from '../constants/Colors';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_SIZE = 25;

const SocialFormInput = props => {
  return (
    <View style={styles.formItem}>
      <MaterialCommunityIcon
        name={props.iconName}
        size={ICON_SIZE}
        style={styles.detailsIcon}
        color={Colors.darkGrey}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={props.placeHolder}
        value={props.defaultValue}
        onChangeText={newValue => props.setInput(newValue)}
        style={[styles.textStyle, styles.input]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.darkGrey,
    fontSize: 17,
  },
  formItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.grey,
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 20,
    flex: 1,
    paddingBottom: 2,
  },
});

export default SocialFormInput;
