import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import {getPlayersFromApi} from "../API/MPGApi";
import PlayerItem from "./PlayerItem";


export default class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players : [],
        }
    }

    componentDidMount() {
        getPlayersFromApi()
            .then(data => this.setState({players: data.poolPlayers}))
    }

    _displayPlayerDetail= (player) => {
        this.props.navigation.navigate('PlayerDetail', {player: player})
    };


    render() {
        return (
            <View>
                <Text>Players page</Text>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.players}
                    renderItem={({item}) => <PlayerItem player={item} displayPlayerDetail={this._displayPlayerDetail}/>}
                />
            </View>
        )
    }
}
