import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Modal, View, SafeAreaView, ScrollView, Animated} from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';

export default class EventCategory extends Component {

    state = { search_value:''}

    itemSelected = (id, name) => {
        // this.setState({search_value:name})
        // this.props.updateSelect(id, name);
    }

    updateSearch = search => {
        // this.setState({search_value:search})
    }
    render(){
        let filteredEvents = this.props.item.filter(
            (item) => {
                return item.name.indexOf(this.state.search_value) !== -1;
            }
        )
        return(
            <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modal}
                    >
                    <SafeAreaView style={{marginTop: 22}}>
                        <SearchBar 
                            autoCapitalize={"none"}
                            value={this.state.search_value} 
                            onChangeText={this.updateSearch} 
                            round={true} 
                            inputContainerStyle={styles.SearchBarInputContainer} 
                            containerStyle={styles.SearchBarContainer} 
                            showCancel={true} placeholder='Search'
                        />
                    <ScrollView>
                    <Container>
                        <Content>
                        <List>
                             {filteredEvents.map((value, index) => {
                                return (
                                    <TouchableOpacity onPress={() => alert('aaa')} key={value.id}>
                                         <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={value.avatar == null ? require('../../assets/images/blank-profile-picture.png'):{ uri:'https://solucardz.com/assets/images/Avatar/'+value.avatar, cache:'default'} }/>
                                            </Left>
                                            <Body>
                                                <Text>{value.name}</Text>
                                                <Text note>{value.email} </Text>
                                            </Body>
                                            </ListItem>
                                    </TouchableOpacity>
                                )
                            })}
                           
                        </List>
                        </Content>
                    </Container>
                    </ScrollView>
                    </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    category_list: {
        marginLeft:10,
        marginRight:10,
        paddingVertical:10, 
        paddingHorizontal:10,
        borderBottomWidth:1, 
        borderBottomColor:'grey'
    },
    SearchBarContainer:{
        backgroundColor:'white',
        borderTopColor:"white",
        borderBottomColor:'white'
    },
    SearchBarInputContainer:{
        backgroundColor:'rgba(142,142,147,0.12)'
    },
})