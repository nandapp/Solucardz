import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  Container,
  Tab,
  Tabs,
  Left,
  Body,
  Right,
  Header,
} from 'native-base';
import {IconButton} from 'react-native-paper';
import Contacts from './Contacts';
import Invitation from './Invitation';
import Request from './Request';
import {Image} from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Header style={{ backgroundColor: 'white' }}
          androidStatusBarColor="white">
          <Left>
            <Icon
              color="darkblue"
              name="menu"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </Left>
          <Body style={{ flex: -1 }}>
          <Image
              source={require("../../../assets/images/Logo.png")}
              style={{width:75, height:25}}
                            containerStyle={{alignSelf:'center'}}
          />
          </Body>
          <Right style={{ flex: 1 }}>
            <IconButton
              icon="barcode-scan"
              color="darkblue"
              size={28}
              style={{paddingTop: 15}}
              onPress={() => {
                this.props.navigation.navigate('QRPage');
              }}
            />
            <IconButton
              icon="plus"
              color="darkblue"
              size={28}
              style={{paddingTop: 15}}
              onPress={() => {
                this.props.navigation.navigate('AddContact');
              }}
            />
          </Right>
        </Header>
        <Container>
          <Tabs tabBarActiveTextColor={'darkblue'} tabContainerStyle={{borderColor:'white'}} tabBarUnderlineStyle={{backgroundColor:'darkblue'}}>
            <Tab heading="CONTACTS" tabStyle={styles.tabBackgroundColor}
                        activeTabStyle={styles.tabBackgroundColor}>
              <Contacts />
            </Tab>
            <Tab heading="INVITATION" tabStyle={styles.tabBackgroundColor}
                        activeTabStyle={styles.tabBackgroundColor}>
              <Invitation />
            </Tab>
            <Tab heading="REQUEST" tabStyle={styles.tabBackgroundColor}
                        activeTabStyle={styles.tabBackgroundColor}>
              <Request />
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBackgroundColor: {
    backgroundColor:'white'
},
});
