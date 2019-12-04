import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import {Container, Content, Card, CardItem, Body} from 'native-base';
import {Header, SearchBar} from 'react-native-elements';
import SideMenuButton from '../../components/SideMenuButton';
import {search} from 'react-native-country-picker-modal/lib/CountryService';
import moment from 'moment';

export default class Exploration extends Component {
  constructor(props) {
    super(props);
    this.state = {events: [], search_value: ''};
  }
  detail = e => {
    // alert(e)
    this.props.navigation.navigate('EventDetail', {events: e});
  };

  updateSearch = search => {
    this.setState({search_value: search});
  };

  get_data = async () => {
    fetch('https://solucardz.com/api/v1/events/from_today', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: await AsyncStorage.getItem('userID'),
        date: moment(new Date()).format('YYYY-MM-DD'),
      }),
    })
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({events: responseJson});
      });
  };

  componentDidMount() {
    this.get_data();
  }

  render() {
    let filteredEvents = this.state.events.filter(event => {
      return (
        event.name
          .toLowerCase()
          .indexOf(this.state.search_value.toLowerCase()) !== -1
      );
    });
    if (!this.state.events) {
      return <ActivityIndicator />;
    }
    return (
      <Container>
        <NavigationEvents onWillFocus={this.get_data} />
        <SearchBar
          autoCapitalize={'none'}
          value={this.state.search_value}
          onChangeText={this.updateSearch}
          round={true}
          inputContainerStyle={{backgroundColor: 'rgba(142,142,147,0.12)'}}
          containerStyle={{
            backgroundColor: 'white',
            borderTopColor: 'white',
            borderBottomColor: 'white',
          }}
          showCancel={true}
          placeholder="Search"
        />
        <Content>
          <Card transparent>
            {filteredEvents.map((value, index) => {
              return (
                <CardItem
                  button
                  onPress={() => this.detail(value)}
                  transparent
                  key={value.id}>
                  <Body>
                    <Image
                      style={{flex: 1, width: '100%', height: 200}}
                      source={{
                        uri:
                          'https://solucardz.com/assets/images/Events/' +
                          value.photo,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'rgb(16,16,16)',
                        fontWeight: '700',
                        marginTop: 10,
                      }}>
                      {value.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'rgb(189,189,189)',
                        marginTop: 4,
                      }}>
                      {moment(value.start_date).format('D MMMM YYYY') +
                        ' at ' +
                        value.start_time}
                    </Text>
                  </Body>
                </CardItem>
              );
            })}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
