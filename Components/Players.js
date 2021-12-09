import React from 'react'
import {View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native'
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
        this.props.navigation.navigate('Détails du joueur', {player: player})
    };


    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.page_title}>Parcourir les joueurs</Text>
                <View style={styles.filters}>
                    <TextInput
                        style={styles.text_input}
                        placeholder='Rechercher un joueur'
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                    />
                    <PlayerPositionModal searchedPositions={this.searchedPositions} searchPositionChanged={this._searchPositionChanged}/>
                </View>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.filteredPlayers}
                    renderItem={({item}) => <PlayerItem player={item} displayPlayerDetail={this._displayPlayerDetail}/>}
                />
                {this.state.isLoading &&
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    page_title: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3B3D3B',
    },
    filters: {
        flexDirection: 'row',
    },
    text_input: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        height: 45,
        borderColor: '#3B3D3B',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
