import React , {useState} from 'react'
import { View, Text , StyleSheet , SafeAreaView} from 'react-native'

import { colors } from '../../utils'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'


export default function Login() {
 
    const [email, setemail] = useState()

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <InputField placeholder="Email" handleChange={()=>(text)=>setemail(text)}/>
            <InputField placeholder="Password" secureTextEntry={true} handleChange={()=>(text)=>setemail(text)} />
            <BtnComponent text="Login"  onPress={()=>console.log("Sign up") } color={colors.primary} />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.lightPrimary,
        padding:20,
    },
    inputContainer:{
        marginTop:200,
        width:'100%'
    }
})