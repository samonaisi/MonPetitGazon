import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Players from "../Components/Players";
import PlayerDetail from "../Components/PlayerDetail";
import Teams from "../Components/Teams";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({color, size }) => {
                    let iconName;

                    if (route.name === 'Joueurs') {
                        iconName = 'person'
                    } else if (route.name === 'Equipes') {
                        iconName = 'people';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#28ADAA',
                tabBarInactiveTintColor: '#3B3D3B',
                tabBarLabelPosition: 'beside-icon'
            })}
        >
            <Tab.Screen name={'Joueurs'} component={Players}/>
            <Tab.Screen name={'Equipes'} component={Teams}/>
        </Tab.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Home'} component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name={'Détails du joueur'} component={PlayerDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
