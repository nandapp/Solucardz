import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native';


export default class Settings extends Component {
    constructor(props){
      super(props);
    }
    
    render(){
        return (
            <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                <Text>Settings Screen</Text>
            </View>
        )
    }
}