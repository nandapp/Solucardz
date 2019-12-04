import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Country} from '../../../common/countryTypes';
import {getUserIdFromAsyncStorage} from '../../../common/Utils';
import CountryPicker from 'react-native-country-picker-modal';

const BLANK_PROFILE_PIC = require('../../../../assets/images/blank-profile-picture.png');
const options = {
  title: '',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class AddContact extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Create Contact',
    headerRight: () => (
      <FAIcon
        onPress={navigation.getParam('save')}
        name="save"
        color="black"
        size={25}
        style={{marginRight: 10}}
      />
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      company_name: '',
      phone: '',
      designation: '',
      userid: '',
      base_64: '',
      email: '',
      photo: BLANK_PROFILE_PIC,
      phone_calling_code: '65',
      phone_country_code: 'SG',
    };
  }

  onCountrySelect = (country: Country) => {
    const callingCode = country.callingCode[0];
    this.setState({phone_country_code: country.cca2});
    this.setState({phone_calling_code: callingCode});
  };

  changeImage = () => {
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response.data);

      if (response.didCancel) {
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: source,
          base_64: response.data,
        });
      }
    });
  };

  saveContact = () => {
    fetch('https://solucardz.com/api/v1/add_leads', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.state.userid,
        name: `${this.state.first_name} ${this.state.last_name}`,
        email: this.state.email,
        company_name: this.state.category_id,
        phone: this.state.phone,
        designation: this.state.designation,
        phone_country: this.state.phone_calling_code,
        photo: this.state.base_64,
      }),
    })
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.error == false) {
          alert('Added');
          this.props.navigation.navigate('Contacts');
        } else {
          alert('Error');
        }
      });
  };

  componentDidMount() {
    getUserIdFromAsyncStorage(userid => {
      this.setState({userid});
    });
    this.props.navigation.setParams({save: this.saveContact});
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <ScrollView centerContent={false}>
            <View>
              <Image style={styles.image} source={this.state.photo} />
              <TouchableOpacity onPress={this.changeImage}>
                <Text style={styles.imageButton}>Add Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder="First Name"
                autoCorrect={false}
                inputStyle={styles.formInput}
                onChangeText={first_name => this.setState({first_name})}
                value={this.state.first_name}
                inputContainerStyle={styles.inputContainer}
              />
              <Input
                placeholder="Last Name"
                autoCorrect={false}
                inputStyle={styles.formInput}
                onChangeText={last_name => this.setState({last_name})}
                value={this.state.last_name}
                inputContainerStyle={styles.inputContainer}
              />
              <Input
                placeholder="Company Name"
                autoCorrect={false}
                autoCapitalize="none"
                inputStyle={styles.formInput}
                onChangeText={company_name => this.setState({company_name})}
                value={this.state.company_name}
                inputContainerStyle={styles.inputContainer}
              />
              <Input
                placeholder="Title"
                inputStyle={styles.formInput}
                onChangeText={designation => this.setState({designation})}
                value={this.state.designation}
                inputContainerStyle={styles.inputContainer}
              />
              <View style={styles.formItem}>
                <CountryPicker
                  countryCode={this.state.phone_country_code}
                  withAlphaFilter
                  withFilter
                  withCallingCode
                  onSelect={country => {
                    this.onCountrySelect(country);
                  }}
                />
                <Text
                  style={
                    styles.formInput
                  }>{`+${this.state.phone_calling_code}`}</Text>
                <Input
                  placeholder="Phone"
                  inputStyle={styles.formInput}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  onChangeText={phone => this.setState({phone})}
                  value={this.state.phone}
                  inputContainerStyle={styles.inputContainer}
                />
              </View>
              <Input
                placeholder="Email"
                autoCompleteType="email"
                keyboardType="email-address"
                inputStyle={styles.formInput}
                autoCapitalize="none"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                inputContainerStyle={styles.inputContainer}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  formContainer: {
    marginTop: 15,
    marginRight: 20,
    marginLeft: 20,
  },
  formInput: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  image: {
    backgroundColor: 'rgb(125,132,148)',
    resizeMode: 'stretch',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
    alignSelf: 'center',
  },
  imageButton: {
    textAlign: 'center',
    fontSize: 17,
    color: 'rgb(32,65,167)',
    fontWeight: '500',
  },
});
