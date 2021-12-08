import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import {getPlayersFromApi} from "../API/MPGApi";
import PlayerItem from "./PlayerItem";


export default class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players : [],
            filteredPlayers: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        getPlayersFromApi()
            .then(data => this.setState({
                players: data.poolPlayers,
                filteredPlayers: data.poolPlayers,
                isLoading: false
            }))
    }

    _displayPlayerDetail= (player) => {
        this.props.navigation.navigate('PlayerDetail', {player: player})
    };


    render() {
        return (
            <View>
                <Text>Players page</Text>
                {this.state.isLoading &&
                <View>
                    <ActivityIndicator size='large' />
                </View>}
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.filteredPlayers}
                    renderItem={({item}) => <PlayerItem player={item} displayPlayerDetail={this._displayPlayerDetail}/>}
                />
            </View>
        )
    }
}
