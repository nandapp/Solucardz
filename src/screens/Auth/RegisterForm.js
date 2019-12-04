import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ActivityIndicator,SafeAreaView,FlatList, Modal, TouchableHighlight, Alert, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import { Dropdown } from 'react-native-material-dropdown';
import { Header, SearchBar } from 'react-native-elements';
import ListIndustries from '../../components/IndustryList';


export default class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {email:'',modalVisible:false, search_value:'', industries:[], value:1,disabled:true, password:'',password_confirmation:'',company:'',category:'',category_id:'',options:'Individual', buttonState:true, re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
        this.radio = this.radio.bind(this)
        this._validation = this._validation.bind(this)
    }
    _validation = () => {
        var error = 0;
        if(this.state.email == '' | this.state.re.test(String(this.state.email).toLowerCase()) == false | this.state.password == '' | this.state.password != this.state.password_confirmation ){
            error+=1;
        }

        if(this.state.value == 2){
            if(this.state.company == '' | this.state.category == ''){
                error+=1;
            }
        }
        if(error == 0){
            this.setState({disabled:false})
        }else{
            this.setState({disabled:true})
        }
    }
    _get_industries = () => {
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

    radio = (value) => {
        if(value == 2){
            this.setState({options:'Organization'})
            if(this.state.company == '' | this.state.category == ''){
                this.setState({disabled:true})
            }
        }
        this.setState({value:value})
    }
    updateSearch = search => {
        this.setState({search_value:search})
    }
    handleSignUp = () => {
        this.props._indicator('')
                fetch('https://solucardz.com/api/v1/register', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    options: this.state.options,
                    company: this.state.organization,
                    industry_id: this.state.category_id,
                  }),
                })
                .then((response) => response.json())
                .then(async(responseJson) => {
                    this.props._indicator('none')
                    if(responseJson.error == false){
                        this.props._toast('Account creation success')
                        this.props.navigation.navigate('Login');
                    }else{
                        this.props._toast(responseJson.error_msg);
                        console.log(responseJson.error_msg)
                    }
                })
    }
    _updateSelect = (id,name) =>{
        this.setState({category_id:id ,search_value: name,category:name,modalVisible:false})
    }
    componentDidMount(){
        this._get_industries();
    }
    render(){
        var radio_props = [
            {label: 'Individual', value: 1 },
            {label: 'Company', value: 2 }
        ];
        let filteredEvents = this.state.industries.filter(
            (industry) => {
              return industry.name.indexOf(this.state.search_value) !== -1;
            }
        )
        if (!this.state.industries) {
            return <View style={[style.activity_container, style.activity_horizontal]}><ActivityIndicator color="#0000ff" size="large" /></View>
        }
        
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',marginBottom:10}}>
                    <Text style={{paddingRight:10}}>I am a</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'rgb(37,71,165)'}
                        buttonSize={10}
                        labelStyle={{paddingRight:10,paddingLeft:5}}
                        animation={false}
                        onPress={this.radio.bind(this)}
                    />
                </View>
                {this.state.value == 2 &&
                <View>
                
                <Text style={styles.label}>Company Name</Text>
                <TextInput 
                    autoCapitalize={'none'}
                    style={styles.input}
                    placeholder={'Company Name'}
                    onChangeText={company => this.setState({company})}
                    onEndEditing={this._validation}
                    value={this.state.company}
                />
                <Text style={styles.label}>Company Category</Text>
                <TextInput 
                    onTouchStart={() => this.setState({modalVisible:true})}
                    editable={false}
                    autoCapitalize={'none'}
                    style={styles.input}
                    placeholder={'Company Category'}
                    onEndEditing={this._validation}
                    value={this.state.category}
                />
                </View>
                }
               <Text style={styles.label}>Email</Text>
               <TextInput 
                    autoCapitalize={'none'}
                    style={styles.input}
                    placeholder={'Email address'}
                    onChangeText={email => this.setState({email})}
                    onEndEditing={this._validation}
                    value={this.state.email}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    secureTextEntry
                    style={styles.input}
                    placeholder={'Password'}
                    onChangeText={password => this.setState({password})}
                    onEndEditing={this._validation}
                    value={this.state.password}
                />

                <Text style={styles.label}>Password Confirmation</Text>
                <TextInput 
                    secureTextEntry
                    style={styles.input}
                    onEndEditing={this._validation}
                    placeholder={'Password Confirmation'}
                    onChangeText={password_confirmation => this.setState({password_confirmation})}
                    value={this.state.password_confirmation}
                />
                <TouchableOpacity 
                    onPress={this.handleSignUp} 
                    disabled={this.state.disabled} 
                    style={[styles.buttonContainer, {backgroundColor: this.state.disabled == true ? 'rgb(115,136,197)': 'rgb(32,65,167)'}]}
                >
                <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:15}} onPress={() => this.props.navigation.navigate('Login')}>
                     <Text style={{textAlign:"center",fontSize:13}}>Already have an account? <Text style={{color:'rgb(37,70,165)'}}>Sign In</Text></Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
                    <View style={{marginTop: 22}}>
                        <SearchBar 
                            autoCapitalize={"none"}
                            value={this.state.search_value} 
                            onChangeText={this.updateSearch} 
                            round={true} 
                            inputContainerStyle={styles.SearchBarInputContainer} 
                            containerStyle={styles.SearchBarContainer} 
                            showCancel={true} placeholder='Search'
                        />
                    <SafeAreaView>
                    <ScrollView>
                    {filteredEvents.map((value, index) => {
                    return (
                        <ListIndustries updateSelect={this._updateSelect} item={value}/> 
                    )
                    })}
                    </ScrollView>
                    </SafeAreaView>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    SearchBarContainer:{
        backgroundColor:'white',
        borderTopColor:"white",
        borderBottomColor:'white'
    },
    SearchBarInputContainer:{
        backgroundColor:'rgba(142,142,147,0.12)'
    },
    input: {
        height:40,
        marginBottom:20,
        // backgroundColor:'white',
        color: 'rgb(16,16,16)',
        borderBottomColor: 'rgb(189,189,189)',
        borderBottomWidth:1
    },
    buttonContainer:{
        marginTop:20,
        paddingVertical:15,
        backgroundColor: 'rgb(32,65,167)',
        borderRadius:10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(255,255,255)',
        fontWeight:'700',
    },
    activity_container: {
        flex: 1,
        justifyContent: 'center'
      },
    activity_horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    category_list: {
        marginLeft:10,
        marginRight:10,
        paddingVertical:10, 
        paddingHorizontal:10,
        borderBottomWidth:1, 
        borderBottomColor:'grey'
    }
})