import { TouchableOpacity } from 'react-native-gesture-handler'
import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ContactsScreen from './src/screens/Contacts/Home';
import SettingsScreen from './src/screens/Home/Settings';
import InvitationScreen from './src/screens/Contacts/Invitation';
import RequestScreen from './src/screens/Contacts/Request';
import QRPageScreen from './src/screens/Home/QRPage';
import CardzScreen from './src/screens/Home/Cardz';
import EventsScreen from './src/screens/Home/Events';
import AddEvent from './src/screens/Events/Functions/AddEvent';
import AddContact from './src/screens/Contacts/Functions/AddContact';
import EditEvent from './src/screens/Events/Functions/EditEvent';
import EventDetail from './src/screens/Events/Functions/EventDetail';
import CardCreationScreen from './src/screens/Home/CardCreation';
import CardDetailsScreen from './src/screens/Home/CardDetails';
import RegisterScreen from './src/screens/Auth/Register';
import LoginScreen from './src/screens/Auth/Login';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPassword';
import ResendVerificationScreen from './src/screens/Auth/ResendVerification';
import SidebarMenu from './src/components/SidebarMenu';
import {Dimensions, Button, YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);
import Colors from './src/constants/Colors';
import {createStore, combineReducers} from 'redux';
import cardsReducer from './src/store/reducers/cards';
import {Provider} from 'react-redux';
import {getUserDetails} from './src/api/CardApi';

const rootReducer = combineReducers({
  cards: cardsReducer,
});

const store = createStore(rootReducer);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        title: 'Forgot Password',
      },
    },
    ResendVerification: {
      screen: ResendVerificationScreen,
      navigationOptions: {
        title: 'Resend Verification',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerBackTitle: null,
      headerTintColor: 'black',
      headerTitleStyle: {
        fontSize: 15,
        color: 'black',
      },
    },
  },
);

const ContactsStack = createStackNavigator(
  {
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
      },
    },
    Invitation: {
      screen: InvitationScreen,
      navigationOptions: {
        header: null,
      },
    },
    Request: {
      screen: RequestScreen,
      navigationOptions: {
        header: null,
      },
    },
    QRPage: {
      screen: QRPageScreen,
      navigationOptions: {
        header: null,
      },
    },
    AddContact: AddContact,
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    initialRouteName: 'Contacts',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 15,
        color: 'white',
      },
    },
  },
);

const CardzStack = createStackNavigator(
  {
    Cardz: {
      screen: CardzScreen,
      navigationOptions: {
        header: null,
      },
    },
    CardDetails: CardDetailsScreen,
    CardCreation: CardCreationScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 15,
        color: 'white',
      },
      headerBackTitle: null,
    },
  },
);

const EventStack = createStackNavigator(
  {
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        header: null,
      },
    },
    AddEvent: {
      screen: AddEvent,
    },
    EditEvent: {
      screen: EditEvent,
    },
    EventDetail: {
      screen: EventDetail,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontSize: 15,
        color: 'black',
      },
      headerBackTitle: null,
    },
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Contacts: ContactsStack,
    Cardz: CardzStack,
    Events: EventStack,
  },
  {
    contentComponent: SidebarMenu,
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Main: MainNavigator,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
