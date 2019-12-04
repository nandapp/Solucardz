import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

export default class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {email:'', password:'', buttonState:true, re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
    }
    handleLogin = () => {
        this.props._indicator('')
        fetch('https://solucardz.com/api/v1/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
          })
          .then((response) => response.json())
          .then(async(responseJson) => {
            this.props._indicator('none')
            if(responseJson.error == false){
            await AsyncStorage.setItem('userID', JSON.stringify(responseJson.id));
            await AsyncStorage.setItem('user',  JSON.stringify(responseJson.user));
            this.props.navigation.navigate('Main');
            }else{
              Toast.show(responseJson.error_msg);
              this.setState({password_error: responseJson.error_msg})
            }
          })
      }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                autoCapitalize={'none'}
                style={styles.input}
                placeholder={'Email address'}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput 
                secureTextEntry
                style={styles.input}
                placeholder={'Password'}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={{textAlign:'right',fontSize:13, color: 'rgb(37,70,165)'}}>Forgot Password?</Text>                    
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={this.handleLogin} 
                disabled={this.state.email == '' | this.state.password == '' | this.state.re.test(String(this.state.email).toLowerCase()) == false ? true:false} 
                style={[styles.buttonContainer, {backgroundColor: this.state.email == '' | this.state.password == '' | this.state.re.test(String(this.state.email).toLowerCase()) == false ? 'rgb(115,136,197)': 'rgb(32,65,167)'}]}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={{marginTop:15}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{textAlign:"center",fontSize:13}}>Don't have an account? <Text style={{color:'rgb(37,70,165)'}}>Sign Up</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop:5}} onPress={() => this.props.navigation.navigate('ResendVerification')}>
                    <Text style={{textAlign:"center",fontSize:13}}>If you not got any email? <Text style={{color:'rgb(37,70,165)'}}>Resend Email</Text></Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
  },
  input: {
      height:40,
      marginBottom:20,
      backgroundColor:'white',
      color: 'rgb(16,16,16)',
      borderBottomColor: 'rgb(189,189,189)',
      borderBottomWidth:1
  },
  label:{ 
      color:'rgb(16,16,16)'
  },
  buttonContainer:{
      marginTop:20,
      paddingVertical:15,
      backgroundColor: 'rgb(32,65,167)',
      borderRadius:10,
  },
  buttonText: {
      textAlign:'center',
      color: 'rgb(255,255,255)',
      fontWeight:'700',
  },

})