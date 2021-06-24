import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Signup1 from '../../screens/auth/signup1';
import Signup2 from '../../screens/auth/signup2';



const Stack=createStackNavigator();
export default function SignupNavigator() {
    return (
       <Stack.Navigator screenOptions={
        {
            headerShown: false,
        }

       }>
           <Stack.Screen name='signup1' component={Signup1}/>
           <Stack.Screen name='signup2' component={Signup2}/>
       </Stack.Navigator>
    )
}
