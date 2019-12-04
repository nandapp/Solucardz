import React, {Component, useEffect, useState} from 'react';
import {View, Text, Picker, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {Dropdown} from 'react-native-material-dropdown';
import {industries} from '../common/industryTypes';

// industryId refers to the index of the industry
const IndustryPicker = ({industryId, onNewValue}) => {
  let defaultValue = !industryId
    ? 'Industry Category'
    : industries[industryId].value;

  return (
    <View style={{flex: 1}}>
      <Dropdown
        containerStyle={styles.dropdownStyle}
        inputContainerStyle={{
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
        }}
        fontSize={17}
        dropdownOffset={{top: 0, left: 0}}
        data={industries}
        value={defaultValue}
        selectedItemColor={Colors.darkGrey}
        textColor={
          industryId === null ? Colors.placeHolderGrey : Colors.darkGrey
        }
        onChangeText={(value, index, data) => onNewValue(index)}
        itemCount={12}
        dropdownPosition={6}
      />
    </View>
  );
};
export default IndustryPicker;

const styles = StyleSheet.create({
  dropdownStyle: {
    borderColor: Colors.grey,
    marginLeft: 10,
    marginRight: 20,
    flex: 1,
  },
  placeHolderTextStyle: {
    fontSize: 17,
    color: Colors.darkGrey,
    width: '88%',
  },
});
