import React, { Component } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styles from './style'

//MultiLang
import {strings} from "../../constants/Lang"

export default class Invitation extends Component {
  constructor(props) {
    super(props);
  }

  //ChangeLang
  // _onSetLanguageToArabic() {
  //   strings.setLanguage('ar');
  //   this.setState({});
  // }
  // _onSetLanguageToEnglish() {
  //   strings.setLanguage('en');
  //   this.setState({});
  // }
  // _onSetLanguageToFrance() {
  //   strings.setLanguage('fr');
  //   this.setState({});
  // }

  render() {
    return (
      <View style={styles.nodatacontainer}>
        <Text style={styles.textTitle}>{strings.noinv}</Text>
        <Text style={styles.textFill}>{strings.noinvdata}</Text>

        {/* <TouchableOpacity
        onPress={() => {this._onSetLanguageToArabic()}}
        style={styles.button}>
          <Text>Change Language to Arabic</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {this._onSetLanguageToEnglish()}}
        style={styles.button}>
          <Text>Change Language to English</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {this._onSetLanguageToFrance()}}
        style={styles.button}>
          <Text>Change Language to France</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}