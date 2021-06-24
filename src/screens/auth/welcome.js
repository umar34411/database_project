import React from 'react'
import { View, Text ,ImageBackground, StyleSheet , SafeAreaView} from 'react-native'

import {images} from 'frontend/src/utils/index.js'
import BtnComponent from '../../components/BtnComponent'
import { colors } from '../../utils'

export default function Welcome({navigation}) {
    return (
        
        <ImageBackground blurRadius={15} source={images.welcomeBackground} style={styles.background}>
        <BtnComponent text="Login" onPress={()=>navigation.navigate('login')} color={colors.primary} />
        <BtnComponent text="Sign Up"  onPress={()=>navigation.navigate('signup') } color={colors.primary} />
      </ImageBackground>
     
      
    )
}


const styles=StyleSheet.create({
    background:{
       flex:1,
       justifyContent:'flex-end',
       padding:20,
       alignItems:'center',
       paddingBottom:60
    }
})