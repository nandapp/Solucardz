import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../constants/Colors';

const ContactListItem = props => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.thumbnailContainerStyle}>
        <Image
          source={
            props.contact.photo
              ? {
                  uri:
                    'https://solucardz.com/assets/images/Leads/' +
                    props.contact.photo,
                }
              : require('../../assets/images/blank-profile-picture.png')
          }
          style={styles.thumbnailStyle}
        />
      </View>
      <View style={styles.contentStyle}>
        <Text style={styles.nameTextStyle}>{props.contact.name || 'Name'}</Text>
        <Text style={styles.phoneTextStyle}>
          {/* {`(+${props.contact.phone_country}) ${props.contact.phone}` ||
            'Phone'} */}
          { props.contact.phone_country | props.contact.phone != undefined ? `(+${props.contact.phone_country}) ${props.contact.phone}`:'-' }
        </Text>
        <Text style={styles.companyTextStyle}>
          {props.contact.company_name || ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 0.5,
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
    resizeMode: 'center',
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
  phoneTextStyle: {
    fontSize: 13,
    color: Colors.grey,
  },
  nameTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  companyTextStyle: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
});

export default ContactListItem;
