import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator, KeyboardAvoidingView} from 'react-native'
import LoginForm from './LoginForm'
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  state = { show: 'none', isLoggedIn:null }
    _indicator = (value) => {
      this.setState({show: value})
    }
    _toast = (msg) => {
      // console.log('abcd')
      this.refs.toast.show(msg, 500, () => {

      });
    }
    checkLogin = async() => {
      if(await AsyncStorage.getItem('userID')){
        this.props.navigation.navigate('Main');
      }
    }
    componentDidMount(){
      this.checkLogin();
    }
    render(){
      const {navigation} = this.props; 
        return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {/* <NavigationEvents onWillFocus={this.checkLogin} /> */}
          <ActivityIndicator size="large" animating={this.state.show == '' ? true:false} style={{display:this.state.show, backgroundColor:'white',opacity:0.6, position:"absolute",zIndex:999,left:0,right:0,top:0,bottom:0, alignItems:'center', justifyContent:'center'}}/>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/Logo.png')}/>
          </View>
          <View style={styles.formContainer}>
            <LoginForm _indicator={this._indicator} _toast={this._toast}  navigation={navigation}/>
          </View>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    logoContainer: {
      flex:1,
      // marginTop:'50%',
      marginTop:100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo:{
     
    },
    formContainer: {
    }
})