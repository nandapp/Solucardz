import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const CardListItem = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('CardDetails')}>
      <View style={styles.containerStyle}>
        <View style={styles.thumbnailContainerStyle}>
          <Image
            source={
              props.avatar
                ? {
                    uri: `https://solucardz.com/assets/images/Avatar/${props.avatar}`,
                  }
                : require('../../assets/images/blank-profile-picture.png')
            }
            style={styles.thumbnailStyle}
          />
        </View>
        <View style={styles.contentStyle}>
          <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
          <Text>{props.designation}</Text>
          <Text style={{color: Colors.grey}}>{props.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    flexDirection: 'row',
    padding: 5,
  },
  contentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  thumbnailStyle: {
    resizeMode: 'stretch',
    width: 75,
    height: 75,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 5,
  },
});

export default CardListItem;
