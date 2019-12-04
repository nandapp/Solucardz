import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  textInput: {
    height: 40,
    fontSize:20,
    width: '90%',
    color: 'white',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  },
  title: {
    color: 'white',
    fontSize: 40,
    paddingTop: 0
  },
  buttonLogin: {
    width: '90%'
  },
  buttonRegister: {
    width: '90%',
    marginTop: 5,
    marginBottom:5,
  }
}