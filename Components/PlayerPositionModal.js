import React from 'react'
import {FlatList, Modal, Switch, Text, TouchableOpacity, View} from 'react-native'
import { positions } from "../Constants/Positions";


export default class PlayerPositionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }


    render() {
        const { searchedPositions, searchPositionChanged} = this.props;

        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({isModalVisible: true})}><Text>FILTER POSITIONS</Text></TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {this.setState({isModalVisible: false});
                    }}
                >
                    <FlatList
                        keyExtractor={(item) => item.toString()}
                        data={Object.keys(searchedPositions)}
                        renderItem={({item}) =>
                            <View>
                                <Text>{positions[item]}</Text>
                                <Switch
                                    trackColor={{ true: "blue" }}
                                    onValueChange={() => searchPositionChanged(item)}
                                    value={searchedPositions[item]}
                                />
                            </View>
                        }
                    />
                    <TouchableOpacity onPress={() => this.setState({isModalVisible: false})}><Text>CLOSE FILTERS</Text></TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
