import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';


import { NavigationContainer } from '@react-navigation/native';
import Account from '../../screens/app/Account';
import Edit from '../../screens/app/Edit';




const Stack = createStackNavigator();
export default function AccountStack() {
    return (
       
       <Stack.Navigator>
           <Stack.Screen name='account' component={Account}/>
           <Stack.Screen name='edit' component={Edit}/>
       </Stack.Navigator>
       
    )
}
