import React, {Component} from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import styles from "./style";

//MultiLang
import {strings} from "../../constants/Lang"

export default class Request extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={ styles.nodatacontainer }>
        <Text style={ styles.textTitle }>{strings.noreq}</Text>
        <Text style={ styles.textFill }>{strings.noreqdata}</Text>
      </SafeAreaView>
    );
  }
  
}
  