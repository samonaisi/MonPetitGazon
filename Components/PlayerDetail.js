import React from 'react'
import {View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native'
import {getPlayerDetailFromApi} from "../API/MPGApi";
import {positions} from "../Constants/Positions";
import Pluralize from "pluralize";
import GameItem from "./GameItem";


export default class PlayerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.route.params.player,
            api_player: undefined,
            isLoading: true,
        }
    }

    componentDidMount() {
        getPlayerDetailFromApi(this.state.player.id)
            .then(data => this.setState({
                api_player: data,
                isLoading: false
            }))
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _playerHeader(player) {
        return(
            <View>
                <Text style={styles.player_name}>{player.firstName}{player.firstName !== null && ' '}{player.lastName}</Text>
                <View style={styles.player_position}>
                    <Text style={styles.player_position_text}>{positions[player.ultraPosition]}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Statistiques :</Text>
                    <Text>{Pluralize('sélection', player.stats.totalMatches, true)}</Text>
                    <Text>{Pluralize('match', player.stats.totalPlayedMatches, true)} {Pluralize('joué', player.stats.totalPlayedMatches)}</Text>
                    <Text>{Pluralize('titularisation', player.stats.totalStartedMatches, true)}</Text>
                    <Text>{Pluralize('but', player.stats.totalGoals, true)}</Text>
                    {player.stats.averageRating !== undefined && <Text>note moyenne : {player.stats.averageRating.toFixed(1)}</Text>}
                </View>
                <Text style={styles.subtitle}>Derniers matchs :</Text>
            </View>
        )
    }

    _displayPlayerFromApi() {
        if (this.state.api_player !== undefined) {
            const { player } = this.state;
            return(
                <View style={styles.list_container}>
                    <FlatList
                            ListHeaderComponent={this._playerHeader(player)}
                            keyExtractor={(item) => item.matchId.toString()}
                            data={player.stats.matches}
                            renderItem={({item}) => <GameItem game={item}/>}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayPlayerFromApi()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main_container: {
        backgroundColor: 'white',
        flex: 1,
    },
    list_container: {
        marginLeft: 5,
        marginRight: 5,
    },
    player_name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#3B3D3B',
    },
    player_position: {
        borderBottomWidth: 2,
        borderBottomColor: '#3B3D3B',
        paddingBottom: 10,
    },
    player_position_text: {
        color: '#3B3D3B',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        color: '#3B3D3B',
        marginTop: 5,
        marginBottom: 5,
    },
});
