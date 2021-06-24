import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../../screens/app/home'
import AccountStack from './AccountStack';
import AddPost from '../../screens/app/AddPost';

const Tab=createBottomTabNavigator();
export default function MainAppNavigator() {
    return (
        <NavigationContainer>
       <Tab.Navigator>
           <Tab.Screen name='home' component={Home}/>
           <Tab.Screen name='addpost' component={AddPost}/>
           <Tab.Screen name='account' component={AccountStack}/>
       </Tab.Navigator>
       </NavigationContainer>
    )
}
