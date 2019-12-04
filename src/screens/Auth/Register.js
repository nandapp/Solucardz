import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator,ScrollView,SafeAreaView, KeyboardAvoidingView} from 'react-native'
import RegisterForm from './RegisterForm'
import Toast, {DURATION} from 'react-native-easy-toast';
export default class Register extends Component {
  state = { show: 'none', industries: [] }
    _indicator = (value) => {
      this.setState({show: value})
    }
    _toast = (msg) => {
      // console.log('abcd')
      this.refs.toast.show(msg, 500, () => {

      });
    }
    componentDidMount(){
      fetch('https://solucardz.com/api/v1/industries', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
      })
        .then((response) => response.json())
        .then(async(responseJson) => {
          this.setState({industries: responseJson})
        })
      }
    render(){
      const {navigation} = this.props;
        return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <ActivityIndicator size="large" animating={this.state.show == '' ? true:false} style={{display:this.state.show, backgroundColor:'white',opacity:0.6, position:"absolute",zIndex:999,left:0,right:0,top:0,bottom:0, alignItems:'center', justifyContent:'center'}}/>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/Logo.png')}/>
          </View>
          <View style={styles.formContainer}>
            <RegisterForm _indicator={this._indicator} _toast={this._toast}  navigation={navigation}/>
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
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logoContainer: {
      flexGrow:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo:{
     
    },
    formContainer: {
      
    }
})