import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { positions } from "../Constants/Positions";


export default class PlayerItem extends React.Component {
    render() {
        const { player, displayPlayerDetail} = this.props;

        return (
            <TouchableOpacity onPress={() => displayPlayerDetail(player)}>
                <Text>{player.firstName} {player.lastName}</Text>
                <Text>{positions[player.ultraPosition]}</Text>
                <Text>{player.stats.totalPlayedMatches} matchs joués</Text>
            </TouchableOpacity>
        )
    }
}
