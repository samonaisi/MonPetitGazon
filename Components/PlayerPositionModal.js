import React from 'react'
import {FlatList, Modal, Switch, Text, View, Button, StyleSheet} from 'react-native'
import { IconButton } from 'react-native-paper';
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
                <IconButton
                    icon="filter"
                    color={'#3B3D3B'}
                    size={30}
                    onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}/>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {this.setState({isModalVisible: false});
                    }}
                >
                    <View style={styles.modal_container}>
                        <View style={styles.modal_content}>
                            <Text style={styles.title}>Filtrer par poste</Text>
                            <FlatList
                                keyExtractor={(item) => item.toString()}
                                data={Object.keys(searchedPositions)}
                                scrollEnabled={false}
                                renderItem={({item}) =>
                                    <View style={styles.position_switch}>
                                        <Text>{positions[item]}</Text>
                                        <Switch
                                            trackColor={{ true: "#28ADAA" }}
                                            onValueChange={() => searchPositionChanged(item)}
                                            value={searchedPositions[item]}
                                        />
                                    </View>
                                }
                            />
                            <Button title={'Valider'} onPress={() => this.setState({isModalVisible: false})}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    modal_container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    modal_content: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        color: '#3B3D3B',
    },
    position_switch: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
