import React , {useState} from 'react'
import { View, Text , StyleSheet , SafeAreaView} from 'react-native'

import { colors } from '../../utils'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'


export default function Signup1({navigation}) {
 
    const [email, setemail] = useState(null)
    const [name, setname] = useState(null)
    const [password, setpassword] = useState(null)
    const [confirmpassword, setconfirmpassword] = useState(null)

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    

    const gotoSignup2=()=>{

        if(name===null || email===null || password===null || confirmpassword===null )
        {
            alert("All fields are necessary")
        }else{
            if(!validateEmail(email))
            {
                alert("Enter Valid Email Address")
            }else if(password!=confirmpassword)
            {
                alert("Password doesn't match")
            }else{
                navigation.navigate('signup2',{name,email,password})
            }

        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <InputField placeholder="Name" handleChange={(text)=>setname(text)}/>
            <InputField placeholder="Email" handleChange={(text)=>setemail(text)}/>
            <InputField placeholder="Password" secureTextEntry={true} handleChange={(text)=>setpassword(text)} />
            <InputField placeholder="Confirm Password" secureTextEntry={true} handleChange={(text)=>setconfirmpassword(text)}/>
            <BtnComponent text="NEXT"  onPress={()=>gotoSignup2() } color={colors.primary} />
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