import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Header, Image} from 'react-native-elements';
import SideMenuButton from '../../components/SideMenuButton'
import Exploration from '../Events/Exploration';
import LandingPages from '../Events/Landing';
import Participation from '../Events/Participation'
import {Icon} from 'react-native-elements'


export default class Events extends Component {
    _fetch_data = (evt) => {
        console.log(evt.i)
    }
    render(){
        const {navigation} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    backgroundColor="white"
                    placement="left"
                    leftComponent={ <Icon
                        color="darkblue"
                        name="menu"
                        onPress={() => this.props.navigation.toggleDrawer()}
                      />}
                    centerComponent={
                        <Image
                            source={require("../../../assets/images/Logo.png")}
                            style={{width:75, height:25}}
                            containerStyle={{alignSelf:'center'}}
                        />
                    }
                    rightComponent={{ 
                        icon: 'add', 
                        color: 'darkblue',
                        onPress: () => this.props.navigation.navigate('AddEvent')
                     }}
                />
               <Container>
                <Tabs tabBarActiveTextColor={'darkblue'} tabContainerStyle={{borderColor:'white'}} tabBarUnderlineStyle={{backgroundColor:'darkblue'}} onChangeTab={(evt) => this._fetch_data(evt) }>
                    <Tab 
                        tabStyle={styles.tabBackgroundColor}
                        activeTabStyle={styles.tabBackgroundColor}
                        heading='MY EVENT'>
                      <LandingPages navigation={navigation}/>
                    </Tab>
                    <Tab 
                        heading='EXPLORE' 
                        tabStyle={styles.tabBackgroundColor} 
                        activeTabStyle={styles.tabBackgroundColor}>
                        <Exploration navigation={navigation}/>
                    </Tab>
                    <Tab 
                        tabStyle={styles.tabBackgroundColor} 
                        activeTabStyle={styles.tabBackgroundColor} 
                        heading='PARTICIPATED'>
                        <Participation navigation={navigation}/>
                    </Tab>
                </Tabs>
                </Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    tabBackgroundColor: {
        backgroundColor:'white'
    },
    imageLogo: {
        width:75,
        height:25,
        alignSelf:'center'
    },
      title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
  