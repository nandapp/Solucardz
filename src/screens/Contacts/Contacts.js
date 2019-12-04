import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  SectionList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getContacts} from '../../api/ContactApi';
import ContactListItem from '../../components/ContactListItem';

import styles from './style';
//MultiLang
import * as RNLocalize from 'react-native-localize';
import {translate} from '../../constants/Lang';
import {setI18nConfig} from '../../constants/Lang';
//Contacts
import ListItem from '../../components/ListItem';
import Avatar from '../../components/Avatar';
import SearchBar from '../../components/SearchBar';

// import Contacts from "react-native-contacts";

const compare = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
};

// Function to get section list from contactsArray
const getSectionList = contactsArray => {
  let currentSectionListIndex = 0;
  let sectionList = [];
  for (contact of contactsArray) {
    let firstCharacter = contact.name.charAt(0);
    if (!sectionList.length) {
      sectionList.push({title: firstCharacter, data: [contact]});
    } else if (
      sectionList[currentSectionListIndex]['title'] !== firstCharacter
    ) {
      sectionList.push({title: firstCharacter, data: [contact]});
      currentSectionListIndex++;
    } else {
      sectionList[currentSectionListIndex]['data'].push(contact);
    }
  }
  return sectionList;
};

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);

    this.state = {
      contacts: [],
      searchPlaceholder: 'Search',
    };
  }

  // async componentWillMount() {
  //   if (Platform.OS === "android") {
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //       title: "Contacts",
  //       message: "This app would like to view your contacts."
  //     }).then(() => {
  //       this.LoadContacts();
  //     });
  //   } else {
  //     this.LoadContacts();
  //   }
  // }

  // LoadContacts() {
  // Contacts.getAll((err, contacts) => {
  //   if (err === 'denied') {
  //     console.warn('Permission to access contacts was denied');
  //   } else {
  //     this.setState({contacts});
  //   }
  // });
  // Contacts.getCount(count => {
  //   this.setState({searchPlaceholder: `Search ${count} contacts`});
  // });
  // }

  getContacts = async () => {
    let userId = await AsyncStorage.getItem('userID');
    getContacts(userId, contactsArray => {
      contactsArray.sort(compare);
      this.setState({contacts: getSectionList(contactsArray)});
      this.setState({
        searchPlaceholder: `Search ${contactsArray.length} contacts`,
      });
    });
  };

  getContactsMatchString(text, callback) {
    let result = this.state.contacts.filter(section => {
      let filteredItem = section.data.filter(item => {
        return (
          // Check if email/phone/phone_country/name include search input
          item.phone != undefined ? item.phone.toString().includes(text):'' ||
          item.phone_country != undefined ? item.phone_country.toString().includes(text):'' ||
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase())
        );
      });
      return filteredItem.length != 0;
    });
    callback(result);
  }

  componentDidMount() {
    this.getContacts();
  }

  search(text) {
    if (text === '' || text === null) {
      this.getContacts();
    } else {
      this.getContactsMatchString(text, contacts => {
        this.setState({contacts: contacts});
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <SearchBar
          searchPlaceholder={this.state.searchPlaceholder}
          onChangeText={this.search}
        />

        <SectionList
          extraData={this.state}
          sections={this.state.contacts}
          renderItem={({item}) => <ContactListItem contact={item} />}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />

        {/* <ScrollView style={{ flex: 1 }}>
          {this.state.contacts.map(contact => {
            return (
              <ListItem
                leftElement={
                  <Avatar
                    img={
                      contact.hasThumbnail
                        ? { uri: contact.ThumbnailPath }
                        : undefined
                    }
                    placeholder={getAvatarInitials(
                      `${contact.givenName} ${contact.familyName}`
                    )}
                    width={40}
                    height={40}
                  />
                }
                key={contact.recordID}
                title={`${contact.givenName} ${contact.familyName}`}
                description={`${contact.company}`}
                onPress={() => Contacts.openExistingContact(contact, () => {})}
                onDelete={() =>
                  Contacts.deleteContact(contact, () => {
                    this.LoadContacts();
                  })
                }
              />
            )
          })}
        </ScrollView> */}
      </SafeAreaView>
    );
  }
}
