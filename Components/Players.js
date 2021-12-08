import React from 'react'
import {View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native'
import {getPlayersFromApi} from "../API/MPGApi";
import PlayerItem from "./PlayerItem";
import {createPositionInitialFilters, positions} from "../Constants/Positions";
import PlayerPositionModal from "./PlayerPositionModal";


export default class Players extends React.Component {
    constructor(props) {
        super(props);
        this.searchedText = '';
        this.searchedPositions = createPositionInitialFilters(positions);
        this.state = {
            players : [],
            filteredPlayers: [],
            isLoading: true,
            isModalVisible: false,
        };
        this._searchPositionChanged = this._searchPositionChanged.bind(this)
    }

    componentDidMount() {
        getPlayersFromApi()
            .then(data => this.setState({
                players: data.poolPlayers,
                filteredPlayers: data.poolPlayers,
                isLoading: false
            }))
    }

    _searchTextInputChanged(text) {
        console.log(this.searchedPositions)
        this.searchedText = text;
        this._filtersChange()
    }

    _searchPositionChanged(position) {
        this.searchedPositions[position] = !this.searchedPositions[position];
        this._filtersChange()
    }

    _filtersChange() {
        let players = this.state.players;
        players = players.filter(player => (player.firstName + ' ' + player.lastName).indexOf(this.searchedText) >= 0);
        if (Object.keys(this.searchedPositions).find(key => this.searchedPositions[key] === true) !== undefined) {
            players = players.filter(player => this.searchedPositions[player.ultraPosition])
        }
        this.setState({filteredPlayers: players})
    }

    _displayPlayerDetail = (player) => {
        this.props.navigation.navigate('PlayerDetail', {player: player})
    };


    render() {
        return (
            <View>
                <Text>Players page</Text>
                <TextInput
                    placeholder='Rechercher un joueur'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <PlayerPositionModal searchedPositions={this.searchedPositions} searchPositionChanged={this._searchPositionChanged}/>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.filteredPlayers}
                    renderItem={({item}) => <PlayerItem player={item} displayPlayerDetail={this._displayPlayerDetail}/>}
                />
                {this.state.isLoading &&
                <View>
                    <ActivityIndicator size='large' />
                </View>}
            </View>
        )
    }
}
