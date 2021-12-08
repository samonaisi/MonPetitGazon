import React from 'react'
import {View, Text, FlatList, ActivityIndicator} from 'react-native'
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
            <View>
                <Text>Teams page</Text>
                {this.state.isLoading &&
                <View>
                    <ActivityIndicator size='large' />
                </View>}
                <FlatList
                    keyExtractor={(item) => this.state.teams[item].id.toString()}
                    data={Object.keys(this.state.teams)}
                    renderItem={({item}) => <TeamItem team={this.state.teams[item]}/>}
                />
            </View>
        )
    }
}
