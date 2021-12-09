import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper';
import { positions } from "../Constants/Positions";
import Pluralize from 'pluralize';


export default class PlayerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        }
    }
    render() {
        const { player, displayPlayerDetail} = this.props;

        return (
            <View style={styles.main_container}>
                <TouchableOpacity style={styles.touchable} onPress={() => displayPlayerDetail(player)}>
                    <Text style={styles.player_name}>{player.firstName}{player.firstName !== null && ' '}{player.lastName}</Text>
                    <Text style={styles.player_position}>{positions[player.ultraPosition]}</Text>
                    {this.state.showMore &&
                        <View>
                            <Text>{Pluralize('sélection', player.stats.totalMatches, true)}</Text>
                            <Text>{Pluralize('match', player.stats.totalPlayedMatches, true)} {Pluralize('joué', player.stats.totalPlayedMatches)}</Text>
                            <Text>{Pluralize('titularisation', player.stats.totalStartedMatches, true)}</Text>
                            <Text>{Pluralize('but', player.stats.totalGoals, true)}</Text>
                            {player.stats.averageRating !== undefined && <Text>note moyenne : {player.stats.averageRating.toFixed(1)}</Text>}
                        </View>
                    }
                </TouchableOpacity>
                <IconButton
                    icon={this.state.showMore ? 'minus' : 'plus'}
                    color={'#3B3D3B'}
                    size={20}
                    onPress={() => this.setState({showMore: !this.state.showMore})}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
   main_container: {
       backgroundColor: 'whitesmoke',
       padding: 5,
       marginTop: 5,
       marginBottom: 5,
       flexDirection: 'row',
       justifyContent: 'space-between'
   },
   touchable: {
       flex: 1,
       paddingLeft: 10,
    },
   player_name: {
       color: '#3B3D3B',
       fontWeight: 'bold',
       fontSize: 20,
   },
   player_position: {
       marginBottom: 5,
       marginTop: 5,
       color: '#3B3D3B',
       fontWeight: 'bold',
       fontSize: 14,
    }
});
