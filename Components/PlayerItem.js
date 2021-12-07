import React from 'react'
import { Text, TouchableOpacity } from 'react-native'


export default class PlayerItem extends React.Component {
    render() {
        const { player, displayPlayerDetail} = this.props;

        return (
            <TouchableOpacity onPress={() => displayPlayerDetail(player)}>
                <Text>{player.firstName} {player.lastName}</Text>
                <Text>{player.stats.totalPlayedMatches} matchs joués</Text>
            </TouchableOpacity>
        )
    }
}
