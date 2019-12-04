import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import {useSelector} from 'react-redux';
import {industries} from '../../common/industryTypes';

const CardDetails = () => {
  const {
    name,
    email,
    company_name,
    industry_id,
    office_phone_ext,
    address,
    city,
    country,
    postalcode,
    designation,
    telephone,
    telephone2,
    barcode_img,
    avatar,
  } = useSelector(state => state.cards.userDetails);

  buttons1 = [
    {name: 'AR', icon: require('../../../assets/images/AR-icon-01.png')},
    {name: 'Call', icon: require('../../../assets/images/phone-01.png')},
    {name: 'Text', icon: require('../../../assets/images/message-01.png')},
  ];

  buttons2 = [
    {name: 'Mail', icon: require('../../../assets/images/mail-01.png')},
    {name: 'Share', icon: require('../../../assets/images/share-line.png')},
    {name: 'Download', icon: require('../../../assets/images/download-01.png')},
  ];

  cardDetails = [
    {
      icon: <FAIcon name="building-o" size={25} style={styles.detailsIcon} />,
      title: 'Company Name',
      detail: !company_name ? '-' : company_name,
    },
    {
      icon: <FAIcon name="building-o" size={25} style={styles.detailsIcon} />,
      title: 'Industry',
      detail: !industry_id ? '-' : industries[industry_id].value,
    },
    // {
    //   icon: <FAIcon name="building-o" size={25} style={styles.detailsIcon} />,
    //   title: 'Division',
    //   //TODO: Get division
    //   detail: '-',
    // },
    {
      icon: (
        <MaterialIcon name="local-phone" size={25} style={styles.detailsIcon} />
      ),
      title: 'Office Phone',
      detail: !telephone ? '-' : telephone,
    },
    {
      icon: (
        <MaterialIcon name="local-phone" size={25} style={styles.detailsIcon} />
      ),
      title: 'Office Phone 2',
      detail: !telephone2 ? '-' : telephone2,
    },
    {
      icon: (
        <MaterialIcon name="local-phone" size={25} style={styles.detailsIcon} />
      ),
      title: 'Office Phone Extension',
      detail: !office_phone_ext ? '-' : office_phone_ext,
    },
    {icon: '', title: 'Address', detail: !address ? '-' : address},
    {
      icon: (
        <MaterialCommunityIcon
          name="city"
          size={25}
          style={styles.detailsIcon}
        />
      ),
      title: 'City',
      detail: !city ? '-' : city,
    },
    {
      icon: (
        <MaterialCommunityIcon
          name="flag"
          size={25}
          style={styles.detailsIcon}
        />
      ),
      title: 'Country',
      detail: !country ? '-' : country,
    },
    {icon: '', title: 'Postal Code', detail: !postalcode ? '-' : postalcode},
  ];

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.divider} />
      <View style={styles.topContainer}>
        <View style={{flex: 1}}>
          <Image
            source={
              avatar
                ? {
                    uri: 'https://solucardz.com/assets/images/Avatar/' + avatar,
                  }
                : require('../../../assets/images/blank-profile-picture.png')
            }
            style={styles.profileIcon}
          />
        </View>
        <View style={styles.personalInfoContainer}>
          <Text style={styles.textStyle}>{!name ? 'Name' : name}</Text>
          <Text style={styles.textStyle}>
            {!designation ? 'Title' : designation}
          </Text>
          <Text style={styles.textStyle}>{!email ? 'Email' : email}</Text>
        </View>
        <Image
          style={{
            flex: 1,
            width: '60%',
            height: '60%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={{
            uri: 'https://solucardz.com/assets/images/Barcode/' + barcode_img,
          }}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.buttonsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {buttons1.map((item, key) => {
            return (
              <View key={key} style={styles.buttonIconContainer}>
                <Image source={item.icon} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {buttons2.map((item, key) => {
            return (
              <View key={key} style={styles.buttonIconContainer}>
                <Image source={item.icon} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardDetailsContainer}>
        {cardDetails.map((cardDetail, key) => {
          return (
            <View
              key={key}
              style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
              <View style={{flex: 1}}>
                {React.isValidElement(cardDetail.icon) ? cardDetail.icon : null}
              </View>
              <View style={{flex: 9}}>
                <Text style={styles.textStyle}>{cardDetail.title}</Text>
                <Text style={[styles.textStyle, {paddingTop: 3}]}>
                  {cardDetail.detail}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={{paddingVertical: '10%'}}></View>
    </ScrollView>
  );
};

CardDetails.navigationOptions = props => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit"
          iconName="edit"
          onPress={() => {
            props.navigation.navigate('CardCreation');
          }}
        />
      </HeaderButtons>
    ),
    title: 'Card Details',
  };
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  topContainer: {
    flexDirection: 'row',
    height: '10%',
  },
  buttonsContainer: {
    height: '20%',
    justifyContent: 'space-evenly',
  },
  cardDetailsContainer: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  personalInfoContainer: {
    flex: 3,
    paddingLeft: 10,
    justifyContent: 'space-evenly',
  },
  qrCode: {
    flex: 1,
    justifyContent: 'center',
  },
  profileIcon: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    marginLeft: 5,
  },
  buttonIconContainer: {
    alignItems: 'center',
    width: 70,
  },
  buttonIcon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 11,
  },
  textStyle: {
    color: Colors.darkGrey,
  },
  detailsIcon: {
    color: Colors.darkGrey,
  },
});
export default CardDetails;
