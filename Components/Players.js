import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


export default class Players extends React.Component {
    constructor(props) {
        super(props);
    }

    _displayPlayerDetail= () => {
        this.props.navigation.navigate('PlayerDetail')
    };


    render() {
        return (
            <View>
                <Text>Players page</Text>
                <TouchableOpacity onPress={() => this._displayPlayerDetail()}>
                    <Text>Click here to go to player page</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
