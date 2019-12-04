import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

class ListIndustries extends Component {

    itemSelected = () => {
       this.props.updateSelect(this.props.item.id, this.props.item.name)
    }
    
    render(){
        const item = this.props.item;
        return(
            <TouchableOpacity onPress={this.itemSelected} key={item.id} style={styles.category_list}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
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
    }
})
export default ListIndustries;