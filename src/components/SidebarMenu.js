import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import {IconButton} from 'react-native-paper';
import {checkLoggedIn} from '../common/Utils';
import {getUserDetails} from '../api/CardApi';
import {useSelector, useDispatch} from 'react-redux';
import {initializeCardsStore} from '../store/actions/cards';
import AsyncStorage from '@react-native-community/async-storage';

const SidebarMenu = props => {
  const {name, email, avatar} = useSelector(state => state.cards.userDetails);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [newEmail, setEmail] = useState(!email ? 'Email' : email);
  const [newName, setName] = useState(!name ? 'Name' : name);
  const [profilePic, setProfilePic] = useState(
    require('../../assets/images/blank-profile-picture.png'),
  );

  const dispatch = useDispatch();

  // Whenever avatar or name change, useEffect() will be called
  useEffect(() => {
    checkLoggedIn(props.navigation, (user, userID) => {
      if (!user || !userID) {
        console.log('Error retrieving user details');
        return;
      }

      getUserDetails(userID, userDetails => {
        setEmail(userDetails.email);
        setName(userDetails.name);
        setProfilePic(userDetails.avatar);
        dispatch(initializeCardsStore(userDetails));
      });
    });
  }, [avatar, name]);

  const items = [
    {
      navOptionThumb: (
        <MaterialIcon
          name="people-outline"
          size={25}
          color={currentScreenIndex === 0 ? Colors.primaryColor : Colors.grey}
        />
      ),
      navOptionName: 'Contacts',
      screenToNavigate: 'Contacts',
    },
    {
      navOptionThumb: (
        <FAIcon
          name="address-card-o"
          size={25}
          color={currentScreenIndex === 1 ? Colors.primaryColor : Colors.grey}
        />
      ),
      navOptionName: 'Cardz',
      screenToNavigate: 'Cardz',
    },
    {
      navOptionThumb: (
        <IonIcon
          name="md-calendar"
          size={25}
          color={currentScreenIndex === 2 ? Colors.primaryColor : Colors.grey}
        />
      ),
      navOptionName: 'Events',
      screenToNavigate: 'Events',
    },
    {
      navOptionThumb: (
        <MaterialCommunityIcon
          name="login-variant"
          size={25}
          color={currentScreenIndex === 3 ? Colors.primaryColor : Colors.grey}
        />
      ),
      navOptionName: 'Logout',
      screenToNavigate: 'Auth',
    },
  ];
  return (
    <View style={styles.sideMenuContainer}>
      <View style={styles.topContainer}>
        <View style={styles.infoContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('CardDetails');
            }}>
            <View>
              {/*Top Large Image */}
              <Image
                source={
                  profilePic
                    ? {
                        uri:
                          'https://solucardz.com/assets/images/Avatar/' +
                          profilePic,
                      }
                    : require('../../assets/images/blank-profile-picture.png')
                }
                style={styles.sideMenuProfileIcon}
              />
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {newName}
              </Text>
              <Text style={{color: 'white'}}>{newEmail}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.settingsButton}>
          <IconButton
            icon="settings"
            color="white"
            size={28}
            style={{paddingTop: 15}}
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
        </View>
      </View>
      {/*Divider between Top container and Sidebar menu items*/}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: Colors.lightGrey,
        }}
      />
      {/*Setting up Navigation Options from option array using loop*/}
      <View style={{width: '100%'}}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor:
                currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
            }}
            key={key}>
            <View style={{marginRight: 10, flex: 1, alignItems: 'center'}}>
              {item.navOptionThumb}
            </View>
            <Text
              style={{
                fontSize: 15,
                flex: 4,
                color:
                  currentScreenIndex === key ? Colors.primaryColor : 'black',
              }}
              onPress={() => {
                setCurrentScreenIndex(key);
                if (item.screenToNavigate == 'Auth') {
                  AsyncStorage.removeItem('userID');
                  AsyncStorage.removeItem('user');
                }
                props.navigation.navigate(item.screenToNavigate);
              }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: Colors.primaryColor,
    paddingLeft: 15,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  sideMenuProfileIcon: {
    resizeMode: 'stretch',
    width: 75,
    height: 75,
    marginTop: 20,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
  },
  infoContainer: {
    flex: 4,
  },
  settingsButton: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
export default SidebarMenu;
