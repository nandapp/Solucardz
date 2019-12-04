import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image,TouchableOpacity, ScrollView, Modal, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { Input, Header } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import Category from '../../../components/EventCategoryList';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const options = {
    title: '',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}
function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function split_date(date){
  var date_format = date.split('-');
  return [date_format[2], date_format[1],date_format[0]].join('-');
}

export default class AddEvent extends Component{
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Create Event',
    headerRight: () => (
      <FAIcon
        onPress={navigation.getParam('save')}
        name="save"
        color="black"
        size={25}
        style={{marginRight:10}}
      />
    ),
  });
    constructor(props){
        super(props)
        this.state = {
        date: new Date(),
        status:true,
        time_status:true,
        date_status:true,
        date_input: '',
        mode: 'date',
        show: false,
        event_name:'',
        category_id:'',
        category_name:'',
        address:'',
        country:'',
        start_date:'',
        start_time:'',
        end_date:'',
        end_time:'',
        description:'',
        user_id:'',
        value: 1,
        base_64: '',
        categories:[],
        photo: null,
        modalVisible:false,
        isDateTimePickerVisible:false,
        loading:false,
      }
    }

    changeImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response.data);
          
            if (response.didCancel) {
              
            }else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                photo: source,
                base_64: response.data
              });
            }
          });
    }

    _updateSelect = (id,name) =>{
        this.setState({modalVisible:false,category_id:id,category_name:name})
    }
      getEventsCategory = () => {
        fetch('https://solucardz.com/api/v1/events/categories', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
          this.setState({categories:responseJson})
        })
      }
      validation = () => {
        var error = false;
        if(this.state.event_name == ''){
          error = true;
          Toast.show('Event Title must be filled!');
        }else if(this.state.category_name == ''){
          error = true;
          Toast.show('Event Category must be filled!');
        }else if(this.state.address == ''){
          error = true;
          Toast.show('Address must be filled!')
        }else if(this.state.country == ''){
          error = true;
          Toast.show('Country must be filled!')
        }else if(this.state.start_time == ''){
          error = true;
          Toast.show('Start Time must be filled!')
        }else if(this.state.start_date == ''){
          error = true;
          Toast.show('Start Date be filled!')
        }else if(this.state.photo == null){
          error = true;
          Toast.show("Photo can't be empty!")
        }else if(this.state.description == ''){
          error = true;
          Toast.show("Description must be filled!")
        }
        return error;
      }
      saveEvents = async() => {
        if(!this.validation()){
        this.setState({loading:true})
        fetch('https://solucardz.com/api/v1/add_events', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: this.state.event_name,
          event_type: this.state.value,
          category_id: this.state.category_id,
          address: this.state.address,
          country: this.state.country,
          start_time: this.state.start_time,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          end_time: this.state.end_time,
          description: this.state.description,
          userid: await AsyncStorage.getItem('userID'),
          photo: this.state.base_64
        }),
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
          if(responseJson.error == false){
            this.setState({loading:false})
            Toast.show("Add event success!")
            this.props.navigation.navigate('Events');
            }else{
             Toast.show("Failed to add event!")
            }
        })
      }
    }

      //Datetimepicker
      showTimePicker = (value) => {
        this.setState({ isDateTimePickerVisible: true,status:false,mode:'time',time_status:value});
      };
      
      showDatePicker = (value) => {
        this.setState({isDateTimePickerVisible:true,status:true, mode:'date',date_status:value})
      }
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = date => {
        if(this.state.status){
          if(this.state.date_status){
            this.setState({start_date: moment(date).format('YYYY-MM-DD')})
          }else{
            this.setState({end_date: moment(date).format('YYYY-MM-DD')})
          }
        }else{
          if(this.state.time_status){
            this.setState({start_time: formatTime(date)})
          }else{
            this.setState({end_time: formatTime(date)})
          }
        }
        this.hideDateTimePicker();
      };
      

      componentDidMount(){
        this.getEventsCategory();
        this.props.navigation.setParams({save: this.saveEvents});
      }
    render(){
        const { show, date, mode, date_status, time_status } = this.state;
        var radio_props = [
          {label: 'Public', value: 1 },
          {label: 'Private', value: 0 }
        ];
        return(
          <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
          >
          {this.state.loading &&
            <ActivityIndicator color="darkblue" size="large" style={{position:'absolute', top:1,zIndex:1, alignSelf:'center'}}/>
          }
          <SafeAreaView style={styles.container}>
            <ScrollView centerContent={false}>
                <View>
                  <Image style={styles.image} source={this.state.photo}/>
                  <TouchableOpacity style={styles.imageButtonContainer} onPress={this.changeImage}>
                    <Text style={styles.imageButton}>Add Cover</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                  <View style={{flexDirection:'row' }}>
                    <Text style={[styles.label]}>Event Type</Text>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'gray'}
                      buttonSize={7}
                      animation={false}
                      labelStyle={{ color: 'rgb(189,189,189)',marginRight:10}}
                      onPress={(value) => {this.setState({value:value})}}
                    />
                  </View>
                  
                  <Input
                    placeholder='Event Title'
                    autoCapitalize={'none'}
                    inputStyle={styles.formInput}
                    onChangeText={(event_name) => this.setState({event_name})}
                    value={this.state.event_name}
                    inputContainerStyle={styles.inputContainer}
                  />
                  <Input
                    onTouchStart={() => this.setState({modalVisible:true})}
                    editable={false}
                    placeholder='Event Category'
                    inputStyle={styles.formInput}
                    value={this.state.category_name}
                    rightIcon={
                      <FAIcon
                        name='caret-down'
                        size={16}
                        color='rgb(189,189,189)'
                      />
                    }
                    inputContainerStyle={{marginBottom:20}}
                  />

                  <Text style={[styles.label, {marginBottom:5}]}>Timeframe</Text>

                  <View style={{flexDirection:'row'}}>
                      <View style={{width:'50%'}}>
                        <Input
                          onTouchStart={() => this.showDatePicker(true)}
                          editable={false}
                          placeholder='Start Date'
                          inputStyle={styles.formInput}
                          value={this.state.start_date == '' ? this.state.start_date:moment(this.state.start_date).format('D MMMM YYYY')}
                          inputContainerStyle={[styles.inputContainer]}
                        />
                      </View>
                      <View style={{width:'50%'}}>
                        <Input
                          onTouchStart={() => this.showTimePicker(true)}
                          editable={false}
                          placeholder='Start Time'
                          inputStyle={styles.formInput}
                          value={this.state.start_time}
                          inputContainerStyle={[styles.inputContainer]}
                        />
                      </View> 
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'50%'}}>
                      <Input
                        onTouchStart={() => this.showDatePicker(false)}
                        editable={false}
                        placeholder='End Date'
                        inputStyle={styles.formInput}
                        value={this.state.end_date == '' ? this.state.end_date:moment(this.state.end_date).format('D MMMM YYYY')}
                        inputContainerStyle={styles.inputContainer}
                      />
                    </View>
                    <View style={{width:'50%'}}>
                      <Input
                        onTouchStart={() => this.showTimePicker(false)}
                        editable={false}
                        placeholder='End Time'
                        inputStyle={styles.formInput}
                        value={this.state.end_time}
                        inputContainerStyle={styles.inputContainer}
                      />
                    </View>
                  </View>

                  <View style={{marginTop:10}}>
                    <Text style={[styles.label,{marginBottom:5}]}>Location</Text>
                    <Input
                        placeholder='Address'
                        inputStyle={styles.formInput}
                        onChangeText={(address) => this.setState({address})}
                        value={this.state.address}
                        inputContainerStyle={styles.inputContainer}
                      />
                      <Input
                        placeholder='Country'
                        onChangeText={(country) => this.setState({country})}
                        inputStyle={styles.formInput}
                        value={this.state.country}
                        inputContainerStyle={styles.inputContainer}
                      />
                  </View>

                  <View style={{marginTop:10}}>
                    <Text style={[styles.label,{marginBottom:5}]}>Detail</Text>
                    <Input
                        placeholder='Description'
                        inputStyle={styles.formInput}
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                        inputContainerStyle={styles.inputContainer}
                      />
                  </View>
              
                </View>
            </ScrollView>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              mode={this.state.mode}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
            <Category item={this.state.categories} updateSelect={this._updateSelect}  modal={this.state.modalVisible}/> 
          </SafeAreaView>
          </KeyboardAvoidingView>
        )
    }


}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  formContainer:{
    marginTop:15,
    marginRight:20,
    marginLeft:20,
  },
  formInput:{
    fontSize:16,
  },
  inputContainer: {
    marginBottom:10 
  },  
  image: {
    width:'100%',
    height:170, 
    backgroundColor:'rgb(125,132,148)', 
    resizeMode:'stretch'
  },
  imageButtonContainer: {
    paddingHorizontal:20, 
    paddingVertical:20,
    borderBottomWidth:1,
    borderBottomColor:'grey'
  },
  imageButton:{
    textAlign:'center', 
    fontSize:17, 
    color:'rgb(32,65,167)',
    fontWeight:'500'
  },
  label: {
    fontSize:16,
    fontWeight:'500',
    color:'rgb(16,16,16)',
    marginRight:10,
    marginLeft:9
  },
  input: {
    height:40,
    marginBottom:20,
    backgroundColor:'white',
    color: 'rgb(16,16,16)',
    borderBottomColor: 'rgb(189,189,189)',
    borderBottomWidth:1
},
})