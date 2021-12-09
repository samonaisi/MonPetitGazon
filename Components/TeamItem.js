import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'


export default class TeamItem extends React.Component {
    render() {
        const { team } = this.props;

        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: team.defaultJerseyUrl}}
                />
                <Text style={styles.team_name}>{team.name['fr-FR'].toUpperCase()}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'white'
    },
    image: {
        height: 100,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: 'whitesmoke',
    },
    team_name: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 130,
        color: 'white',
        fontSize: 40,
        padding: 0,
        fontWeight: 'bold',
        textShadowColor: '#3B3D3B',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});
