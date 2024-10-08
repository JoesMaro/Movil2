import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { Register } from '../screens/Register';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Iniciar Sesion" component={LoginScreen} />
            <Stack.Screen name='Registro' component={Register} />
            <Stack.Screen name='MyTabs' component={MyTabs} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Login' component={LoginScreen} />
        </Tab.Navigator>
    );
}

export const Navigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
};
