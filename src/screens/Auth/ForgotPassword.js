import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class ForgotPassword extends Component{
    constructor(props){
        super(props)
        this.state = {email: '', error_message: null,show:'none', re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
    }
    handleForgot = () => {
        this.setState({show:''})
        fetch('https://solucardz.com/api/v1/reset', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email,
          }),
      })
      .then((response) => response.json())
      .then(async(responseJson) => {
          this.setState({show:'none'})
        if(responseJson.error == false){
            this.refs.toast.show('Success!', 500, () => {

            });
        }else{
            this.refs.toast.show(responseJson.error_msg, 500, () => {

            });
        }
      })
      .catch(error =>{
          console.log(error)
      })
}
    

    render(){
        
        return(
            <View style={{flex:1, alignItem:'center',margin:10 }}>
                <ActivityIndicator size="large" animating={this.state.show == '' ? true:false} style={{display:this.state.show, backgroundColor:'white',opacity:0.6, position:"absolute",zIndex:999,left:0,right:0,top:0,bottom:0, alignItems:'center', justifyContent:'center'}}/>
                <Text style={{color:'gray',textAlign:'left',margin:10}}>Insert your email address, we will send instructions to reset your password.</Text>
                <Input autoFocus={true}
                    label='Email'
                    autoCapitalize={'none'}
                    value={this.state.email}
                    labelStyle={{fontSize:15}}
                    onChangeText={email => this.setState({email, error_message: null})}
                    errorMessage={this.state.error_message}
                    inputStyle={{color:'black',fontSize:15}}
                />
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity 
                    onPress={this.handleForgot} 
                    disabled={this.state.email == ''? true:false} 
                    style={[styles.buttonContainer, {backgroundColor: this.state.email == '' | this.state.password == '' | this.state.re.test(String(this.state.email).toLowerCase()) == false ? 'rgb(115,136,197)': 'rgb(32,65,167)'}]}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{margin:10,marginTop:5, alignItems: 'center'}}>
                    <Text style={{fontSize: 14,color:'gray'}}>Don't have an account?<Text onPress={() => this.props.navigation.navigate('Register')} style={{color:'rgb(32,65,167)',fontWeight:'bold'}}> Click here!</Text></Text>
                </View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='top'
                    positionValue={270}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:20,
        width:'95%',
        paddingVertical:10,
        backgroundColor: 'rgb(32,65,167)',
        borderRadius:10,
    },
    buttonText: {
        textAlign:'center',
        color: 'rgb(255,255,255)',
        fontWeight:'700',
    },
  
  })