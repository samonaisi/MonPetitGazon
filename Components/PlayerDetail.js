import React from 'react'
import {View, Text, ActivityIndicator, ScrollView} from 'react-native'
import {getPlayerDetailFromApi} from "../API/MPGApi";


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
                <View>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayPlayerFromApi() {
        if (this.state.api_player !== undefined) {
            const { api_player } = this.state;
            return(
                <View>
                    <Text>{api_player.id}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <Text>Player detail page</Text>
                <Text>{this.state.player.id}</Text>
                <Text>{this.state.player.firstName} {this.state.player.lastName}</Text>
                {this._displayLoading()}
                {this._displayPlayerFromApi()}
            </ScrollView>
        )
    }
}
