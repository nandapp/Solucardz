import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, Modal, View, SafeAreaView, ScrollView} from 'react-native'
import { SearchBar } from 'react-native-elements';

export default class EventCategory extends Component {

    state = { search_value:''}

    itemSelected = (id, name) => {
        this.setState({search_value:name})
        this.props.updateSelect(id, name);
    }

    updateSearch = search => {
        this.setState({search_value:search})
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
                        <TouchableOpacity onPress={() => this.itemSelected(value.id,value.name)} key={value.id} style={styles.category_list}>
                            <Text>{value.name}</Text>
                        </TouchableOpacity>
                    )
                    })}
                    </ScrollView>
                    </SafeAreaView>
                    </View>
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