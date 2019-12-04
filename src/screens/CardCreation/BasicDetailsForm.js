import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import {Country} from '../../common/countryTypes';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IndustryPicker from '../../components/IndustryPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ICON_SIZE = 25;

const findCallingCode = (callingCode, callback) => {
  getAllCountries().then(countries => {
    countries.forEach(country => {
      if (country.callingCode[0] == callingCode) {
        callback(country.cca2);
      }
    });
  });
};

const findCountryName = (countryName, callback) => {
  getAllCountries().then(countries => {
    countries.forEach(country => {
      if (country.name == countryName) {
        callback(country.cca2);
      }
    });
  });
};

const BasicDetailsForm = props => {
  const states = props.states;
  const [newTelephone1CountryCode, setTelephone1CountryCode] = useState('SG');
  const [newTelephone2CountryCode, setTelephone2CountryCode] = useState('SG');
  const [newMobileCountryCode, setMobileCountryCode] = useState('SG');
  const [newCountryCode, setCountryCode] = useState('SG');

  useEffect(() => {
    findCallingCode(states.telephone1_country.state, countryCode => {
      setTelephone1CountryCode(countryCode || 'SG');
    });
    findCallingCode(states.telephone2_country.state, countryCode => {
      setTelephone2CountryCode(countryCode || 'SG');
    });
    findCallingCode(states.mb_country.state, countryCode => {
      setMobileCountryCode(countryCode || 'SG');
    });
    findCountryName(states.country.state, countryCode => {
      setCountryCode(countryCode || 'SG');
    });
  }, []);

  const onCountrySelect = (country: Country, type) => {
    const callingCode = country.callingCode[0];
    const countryName = country.name;
    switch (type) {
      case 'mobile':
        findCallingCode(callingCode, () => {
          setMobileCountryCode(country.cca2);
          states.mb_country.function(country.callingCode[0]);
        });
        break;
      case 'telephone1':
        findCallingCode(callingCode, () => {
          setTelephone1CountryCode(country.cca2);
          states.telephone1_country.function(country.callingCode[0]);
        });
        break;
      case 'telephone2':
        findCallingCode(callingCode, () => {
          setTelephone2CountryCode(country.cca2);
          states.telephone2_country.function(country.callingCode[0]);
        });
        break;
      case 'country':
        findCountryName(countryName, () => {
          setCountryCode(country.cca2);
          states.country.function(country.name);
        });
      default:
        console.log(`${type} not in switch statement`);
        break;
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <Text style={styles.textStyle}>
        Basic Information(<Text style={{color: 'red'}}>Required*</Text>)
      </Text>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="account-outline"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Full Name"
          value={states.name.state}
          onChangeText={newValue => states.name.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="email"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <TextInput
          editable={false}
          placeholder="Email"
          value={!props.email ? '' : props.email}
          style={[
            styles.input,
            styles.textStyle,
            {color: Colors.grey, opacity: 0.8},
          ]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="phone"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <CountryPicker
          countryCode={newMobileCountryCode}
          withAlphaFilter
          withFilter
          withCallingCode
          onSelect={country => {
            onCountrySelect(country, 'mobile');
          }}
        />
        <Text style={styles.textStyle}>{`+${states.mb_country.state}`}</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Mobile Phone"
          autoCorrect={false}
          textContentType="telephoneNumber"
          value={states.mobilephone.state}
          onChangeText={newValue => states.mobilephone.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <View style={{flex: 1}}></View>
        <TextInput
          autoCapitalize="none"
          placeholder="Designation"
          value={states.designation.state}
          onChangeText={newValue => states.designation.function(newValue)}
          style={[styles.textStyle, styles.input, {flex: 12}]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="phone"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <TextInput
          keyboardType="phone-pad"
          autoCorrect={false}
          placeholder="Office Extension"
          textContentType="telephoneNumber"
          value={states.office_phone_ext.state}
          onChangeText={newValue => states.office_phone_ext.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <Text style={[styles.textStyle, {paddingVertical: 15}]}>
        Additional Information
      </Text>
      <View style={styles.formItem}>
        <FAIcon
          name="building-o"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Company Name"
          value={states.company_name.state}
          onChangeText={newValue => states.company_name.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <FAIcon
          name="building-o"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <IndustryPicker
          industryId={states.industry_id.state}
          onNewValue={newValue => states.industry_id.function(newValue)}
          style={{width: '100%'}}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="phone"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <CountryPicker
          countryCode={newTelephone1CountryCode}
          withAlphaFilter
          withFilter
          withCallingCode
          onSelect={country => {
            onCountrySelect(country, 'telephone1');
          }}
        />
        <Text
          style={
            styles.textStyle
          }>{`+${states.telephone1_country.state}`}</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Office Phone"
          autoCorrect={false}
          textContentType="telephoneNumber"
          value={states.telephone.state}
          onChangeText={newValue => states.telephone.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="phone"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <CountryPicker
          countryCode={newTelephone2CountryCode}
          withAlphaFilter
          withFilter
          withCallingCode
          onSelect={country => {
            onCountrySelect(country, 'telephone2');
          }}
        />
        <Text
          style={
            styles.textStyle
          }>{`+${states.telephone2_country.state}`}</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Office Phone 2"
          autoCorrect={false}
          textContentType="telephoneNumber"
          value={states.telephone2.state}
          onChangeText={newValue => states.telephone2.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <View style={{flex: 1}}></View>
        <TextInput
          autoCorrect={false}
          placeholder="Address"
          value={states.address.state}
          textContentType="fullStreetAddress"
          onChangeText={newValue => states.address.function(newValue)}
          style={[styles.textStyle, styles.input, {flex: 12}]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="city"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <TextInput
          placeholder="City"
          value={states.city.state}
          onChangeText={newValue => states.city.function(newValue)}
          style={[styles.textStyle, styles.input]}
        />
      </View>
      <View style={styles.formItem}>
        <MaterialCommunityIcon
          name="flag-variant"
          size={ICON_SIZE}
          style={styles.detailsIcon}
          color={Colors.darkGrey}
        />
        <CountryPicker
          countryCode={newCountryCode}
          withAlphaFilter
          withFilter
          onSelect={country => {
            onCountrySelect(country, 'country');
          }}
        />
        <TextInput
          style={[styles.countryInput, styles.textStyle]}
          editable={false}>
          {states.country.state}
        </TextInput>
      </View>
      <View style={styles.formItem}>
        <View style={{flex: 1}}></View>
        <TextInput
          placeholder="Postal Code"
          autoCompleteType="postal-code"
          value={states.postalcode.state}
          keyboardType="number-pad"
          textContentType="postalCode"
          onChangeText={newValue => states.postalcode.function(newValue)}
          style={[styles.textStyle, styles.input, {flex: 12}]}
        />
      </View>
      <View style={{paddingVertical: 20}}></View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
  },
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
  countryInput: {
    borderColor: Colors.grey,
    borderBottomWidth: 1,
    marginRight: 20,
    flex: 1,
    paddingBottom: 5,
  },
});

export default BasicDetailsForm;
