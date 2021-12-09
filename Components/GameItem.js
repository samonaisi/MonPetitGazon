import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Pluralize from "pluralize";


export default class GameItem extends React.Component {

    _isVictory(game) {
        let home_advantage = game.home.score - game.away.score;

        if (home_advantage === 0) {
            return 'match nul'
        }
        else if (game.home.clubId === game.playerClubId && home_advantage > 0) {
            return 'victoire'
        }
        else if (game.away.clubId === game.playerClubId && home_advantage < 0) {
            return 'victoire'
        }
        else return 'défaite'
    }

    _shortenClubId(id) {
        return id.replace('mpg_championship_club_','Club n°');
    }

    render() {
        const { game } = this.props;
        return (
            <View style={styles.main_container}>
                <Text style={styles.game_info}>Semaine {game.gameWeekNumber} - {this._isVictory(game)}</Text>
                <Text style={styles.game_info}>{this._shortenClubId(game.home.clubId)} - {this._shortenClubId(game.away.clubId)}</Text>
                <Text style={styles.game_score}>{game.home.score} - {game.away.score}</Text>
                {game.playerPerformance.status === 1 &&
                <View style={styles.player_performance}>
                    <View style={styles.player_performance_item}>
                        <MaterialIcons name={'access-time'} size={30} color={'#28ADAA'} />
                        <Text>{game.playerPerformance.minutesPlayed}mn</Text>
                    </View>
                    <View style={styles.player_performance_item}>
                        <MaterialIcons name={'grade'} size={30} color={'#28ADAA'} />
                        <Text>note : {game.playerPerformance.rating}</Text>
                    </View>
                    <View style={styles.player_performance_item}>
                        <MaterialCommunityIcons name={'target'} size={30} color={'#28ADAA'} />
                        <Text>{Pluralize('but', game.playerPerformance.goals, true)}</Text>
                    </View>
                </View>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        borderWidth: 2,
        borderColor: '#3B3D3B',
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
        padding: 5
    },
    game_info: {
        textAlign: 'center',
        color: '#3B3D3B',
        fontWeight: 'bold',
        fontSize: 16
    },
    game_score: {
        textAlign: 'center',
        color: '#3B3D3B',
        fontWeight: 'bold',
        fontSize: 30
    },
    player_performance: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    player_performance_item: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
