import React from 'react'
import { View, Text , StyleSheet ,TextInput} from 'react-native'
import colors from '../utils/colors'

export default function InputField({placeholder ,handleChange ,...otherProps}) {
    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder={placeholder} onChangeText={handleChange} style={styles.input} {...otherProps}  />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
       backgroundColor:colors.inputBackground,
       width:'100%',
       padding:15,
       borderRadius:10,
       marginBottom:10,
   
    },
    input:{
        width:'100%'
    }
})