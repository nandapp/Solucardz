import React, {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, Button, Image } from 'react-native'

export default class QRPage extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>QR Page Screen</Text>
        <Image
          source={require("../../../assets/images/barcode.png")}
          style={{
            aspectRatio: 2,
            resizeMode: "center"
          }}
        />
      </View>
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
    fontWeight: "bold",
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    },
  });
  