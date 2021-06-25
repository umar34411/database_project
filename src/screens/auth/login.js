import React , {useState, useContext} from 'react'
import { View, Text , StyleSheet , SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors ,serverAddress } from '../../utils'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'
import { basicInfoContext } from '../Main'

export default function Login() {
 
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)

    let info = useContext(basicInfoContext)

    const login=()=>{
       if(email===null || password===null)
       {
           alert("all fields are necessary")
       }else{
           const finalData={
               email,
               password
           }
           const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(finalData),
        }



        fetch(`${serverAddress.baseurl}/login`, options).then(
            (response) => response.text()
        ).then(
            async (response) => {
                console.log(response)
                if (response === 'failed') { alert("Invalid Credentials") }
                else if (response === 'failed') {
                    alert("Invalid Credentials")
                } else {

                    await info.settoken(response);
                    await info.setemail(email);
                    await AsyncStorage.setItem('token', response);
                    await AsyncStorage.setItem('email', email);
                    
                    

                }
            }
        ).catch(
            (error) => console.log("fetch :" + error)
        )


       }
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <InputField placeholder="Email" handleChange={(text)=>setemail(text)}/>
            <InputField placeholder="Password" secureTextEntry={true} handleChange={(text)=>setpassword(text)} />
            <BtnComponent text="Login"  onPress={()=>login() } color={colors.primary} />
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