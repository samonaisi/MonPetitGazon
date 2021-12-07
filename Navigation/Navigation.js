import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Players from "../Components/Players";
import PlayerDetail from "../Components/PlayerDetail";
import Teams from "../Components/Teams";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return(
        <Tab.Navigator>
            <Tab.Screen name={'Players'} component={Players}/>
            <Tab.Screen name={'Teams'} component={Teams}/>
        </Tab.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Home'} component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name={'PlayerDetail'} component={PlayerDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
