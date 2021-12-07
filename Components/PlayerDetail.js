import React from 'react'
import { View, Text } from 'react-native'


export default class PlayerDetail extends React.Component {
    render() {
        const player = this.props.route.params.player;
        return (
            <View>
                <Text>{player.firstName} {player.lastName}</Text>
                <Text>Player detail page</Text>
            </View>
        )
    }
}
