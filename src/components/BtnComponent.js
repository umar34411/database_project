import React from 'react'
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native'
import { colors } from 'frontend/src/utils/index'

export default function BtnComponent({text , onPress , color , customization}) {
    return (
        
        <TouchableOpacity onPress={onPress} style={[styles .container, {backgroundColor:color} , customization]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    container:{
      
     width:'100%',
     padding:20,
     borderRadius:20,
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:18
    }
})