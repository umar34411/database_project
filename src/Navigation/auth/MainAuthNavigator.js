import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Welcome from '../../screens/auth/welcome';
import Login from '../../screens/auth/login'
import SignupNavigator from './signupNavigator';


const Stack = createStackNavigator();
export default function MainAuthNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='welcome' component={Welcome} options={
                    {headerShown: false}
                }/>
                <Stack.Screen name='login' component={Login} />
                <Stack.Screen name='signup' component={SignupNavigator} />

            </Stack.Navigator>

        </NavigationContainer>
    )
}
