import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { Component} from 'react'
import {View ,Text, Image, StyleSheet, Button, ImageBackground,SafeAreaView, ActivityIndicator, ScrollView, Alert} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/CustomHeaderButton';
import {Header} from 'react-native-elements'
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast'
import UserList from '../../../components/UserInvitationList';



export default class eventDetail extends Component {
    constructor(){
        super();
        this.state = {event_id:null, modalVisible:false,userid:null, events:null, loading:false, join:null,maybe:null, user:null, userlist:[]}
    }
    _onClick = () => {
        this.props.navigation.goBack(null);
    }
    editDetail = () => {
        this.props.navigation.navigate('EditEvent',{events: this.state.events});
    }
    _fetch_data = () => {
        fetch('https://solucardz.com/api/v1/get_events', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.events.id,
        })
      })
      .then((response) => response.json())
      .then(async(responseJson) => {
        this.setState({events: responseJson.event})
        this.get_response_data();
      })

      fetch('https://solucardz.com/api/v1/events/response', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.events.id,
              response: 1,
            })
          })
          .then((response) => response.json())
          .then(async(responseJson) => {
            var userid = await AsyncStorage.getItem('userID');
            const data = responseJson.filter(async(item) => {
              if(item.id == userid){
                  this.setState({join:true,maybe:false})
                  return;
              }
            })
          })
          fetch('https://solucardz.com/api/v1/events/response', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.events.id,
              response: 2,
            })
          })
          .then((response) => response.json())
          .then(async(responseJson) => {
            var userid = await AsyncStorage.getItem('userID');
            const data = responseJson.filter(async(item) => {
              if(item.id == userid){
                  this.setState({join:false,maybe:true})
                  return;
              }
            })

          })
    }
    setParticipants = async(value) => {
        var user = await AsyncStorage.getItem('userID');
        fetch('https://solucardz.com/api/v1/events/set_participants', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response: value,
                id: this.state.events.id,
                userid: user, 
            })
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            this._fetch_data(this.state.events.id)
        })
    }
    get_response_data = async() => {
        
    }
    deleteEvents = () => {
        fetch('https://solucardz.com/api/v1/remove_events', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id:this.state.events.id,
            })
          })
          .then((response) => response.json())
          .then(async(responseJson) => {
            if(responseJson.error){
                Toast.show(responseJson.error_msg)
            }else{
                Toast.show('Delete event success!');
                this.props.navigation.navigate('Events');
            }
        })
    }
    handleDelete = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure to delete this event?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteEvents()},
            ],
            {cancelable: false},
          );
    }
    handleAction = (value) =>{
        Alert.alert(
            'Confirmation',
            'Are you sure to select this option?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.setParticipants(value)},
            ],
            {cancelable: false},
          );
    }

    handleInvite = () => {
        // fetch('https://solucardz.com/api/v1/events/getAllUsers', {
        //     method: "POST",
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       eventid: this.state.events.id,
        //       userid: this.state.user.id,
        //       companyid: this.state.user.company_id
        //     })
        //   })
        //   .then((response) => response.json())
        //   .then(async(responseJson) => {
        //     responseJson = responseJson.map(item => {
        //         item.isSelect = false;
        //         return item
        //     })
        //     this.setState({userlist: responseJson, modalVisible:true})
        //   })
        Toast.show("Under Development!")
        // this.refs.toast.show('Under Development',500)
    }
    
    componentDidMount = async() => {
        this.setState({events: this.props.navigation.getParam('events'), userid: await AsyncStorage.getItem('userID')})
        this._fetch_data();
        this.setState({user: await AsyncStorage.getItem('user')})
    }

    render(){
        const {navigation} =  this.props;
        const {events} =  this.state;
        if (!this.state.events) {
            return <View style={[style.activity_container, style.activity_horizontal]}><ActivityIndicator color="#0000ff" size="large" /></View>
        }
        return(
            <SafeAreaView style={style.container}>
                <NavigationEvents onWillFocus={() => this._fetch_data()}/>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ImageBackground style={style.imageBackground} source={{uri:'https://solucardz.com/assets/images/Events/'+events.photo}}>
                        <View style={{position:'absolute',top:19, right:10}}>
                            <TouchableOpacity style={{width:40}} onPress={this.handleDelete}>
                                <Image style={{width:20, height:20, alignSelf:'flex-end'}} source={require('../../../../assets/images/delete-bin-01.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{position:'absolute',left:10,top:20}}>
                            <TouchableOpacity onPress={this._onClick} style={style.buttonTouch}>
                                <Image style={{width:17, height:17}} source={require('../../../../assets/images/back-button.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{position:'absolute', bottom:10, left:20}}>
                            <Text style={{fontSize:20,color:'rgb(255,255,255)'}}>{events.name}</Text>
                            <Text style={{fontSize:32,color:'rgb(255,255,255)',fontWeight:'600'}}>{events.address}</Text>
                            <Text style={{fontSize:16,color:'rgb(255,255,255)'}}>{moment(events.start_date).format('D MMMM YYYY')+' at '+events.start_time}</Text>
                        </View>
                    </ImageBackground>
                </View>
               
                <View style={style.buttonContainer}>
                    <ScrollView centerContent={false}>
                    {this.state.events.created}
                    <View style={style.ActionContainer}>
                        {this.state.events.created_by == this.state.userid &&
                            <>
                             <TouchableOpacity style={style.buttonAction} onPress={this.handleInvite}>
                             <Text style={style.button}>Invite</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.buttonAction} onPress={this.editDetail}>
                                <Text style={style.button}>Edit Detail</Text>
                            </TouchableOpacity>
                            </>
                        }
                        {this.state.events.created_by != this.state.userid &&
                            <>
                             <TouchableOpacity style={[style.buttonAction,{backgroundColor: this.state.join ? '#2345A4':'rgb(239,239,246)'}]} onPress={() => this.state.join ? '':this.handleAction(1)}>
                                <Text style={[style.button,{color: this.state.join ? 'white':'rgb(26,56,173)'}]}>Join</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.buttonAction,{backgroundColor: this.state.maybe ? '#2345A4':'rgb(239,239,246)'}]} onPress={() => this.state.maybe ? '':this.handleAction(2)}>
                                <Text style={[style.button,{color: this.state.maybe ? 'white':'rgb(26,56,173)'}]}>Maybe</Text>
                            </TouchableOpacity>
                            </>
                        }
                       
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',margin:23, borderColor:'grey',borderBottomWidth:1, paddingVertical:10}}>
                        <Text style={style.detail}>{events.joindata} Join</Text>
                        <Text style={style.detail}>{events.maybedata == null ? 0:events.maybedata} Maybe</Text>
                        <Text style={style.detail}>0 Not Join</Text>
                    </View>
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Event Start</Text>
                        <Text>{moment(events.start_date).format('D MMMM YYYY')+' at '+events.start_time}</Text>
                    </View>
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Event End</Text>
                        <Text>{moment(events.end_date).format('D MMMM YYYY')+' at '+events.end_time}</Text>
                    </View>
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Location</Text>
                        <Text>{events.address+', '+events.country}</Text>
                    </View>
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Description</Text>
                        <Text>{events.description}</Text>
                    </View>
                    </ScrollView>
                </View>
                <UserList item={this.state.userlist} modal={this.state.modalVisible}/>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
    },
    headerContainer:{
        marginLeft:23,
        marginBottom:20
    },  
    title:{
        fontSize:18,
        fontWeight:'700'
    }, 
    detail:{
        fontSize:16,
        borderTopColor:'white',
        textAlign:'center',
        width:'33%',
        paddingHorizontal:10,
        paddingHorizontal:10,
    },  
    imageBackground: {
        width:'100%',
        height:'100%'
    },
    buttonTouch: {
        width:40,
        height:40,
    },
    buttonContainer: {
        flex:2
    },
    ActionContainer: {
        flexDirection:'row',
        justifyContent:'center'
    },
    button: {
        textAlign:'center',
        fontSize:18,
        color:'rgb(26,56,173)'
    },
    buttonAction:{
        width:146,
        margin:15,
        marginTop:15,
        paddingVertical:15,
        paddingHorizontal:15,
        backgroundColor: 'rgb(239,239,246)',
        borderRadius:5,
    },
    activity_container: {
        flex: 1,
        justifyContent: 'center'
      },
    activity_horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})