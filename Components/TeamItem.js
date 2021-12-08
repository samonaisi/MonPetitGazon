import React from 'react'
import { Text, View } from 'react-native'


export default class TeamItem extends React.Component {
    render() {
        const { team } = this.props;

        return (
            <View>
                <Text>{team.id}</Text>
            </View>
        )
    }
}
