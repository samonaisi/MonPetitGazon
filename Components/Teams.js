import React from 'react'
import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import { getTeamsFromApi } from "../API/MPGApi";
import TeamItem from "./TeamItem";


export default class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams : [],
            isLoading: true,
        }
    }

    componentDidMount() {
        getTeamsFromApi()
            .then(data => this.setState({
                teams: data.championshipClubs,
                isLoading: false
            }))
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.page_title}>Parcourir les équipes</Text>
                <FlatList
                    keyExtractor={(item) => this.state.teams[item].id.toString()}
                    data={Object.keys(this.state.teams)}
                    renderItem={({item}) => <TeamItem team={this.state.teams[item]}/>}
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
