import React , {useState}from 'react'
import { View, Text, StyleSheet , Image , SafeAreaView } from 'react-native'
import { colors, images } from '../../utils'

export default function Profile() {

    const [image, setimage] = useState(images.dummy)
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.contentContainer}>
             <Image source={image} style={styles.profile}/>
             <View style={styles.bioContainer}>
              <Text style={{fontSize:24,fontWeight:'bold'}}>Umar Farooq</Text>
              <Text style={{color:colors.secondaryText,marginBottom:10}}>umar123@gmail.com</Text>
              <Text style={styles.text}>03434934138</Text>
              <Text style={styles.text}>118-d nawab town raiwind road lahore nljnqlksndwkjfdmxdwjlndljfnsd</Text>
              <Text style={styles.text}>Graduate</Text>
              <Text style={styles.text}>java,c++,javascript,react</Text>
             </View>
            </View>
        </View>
        </SafeAreaView>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:colors.lightPrimary
    },
    contentContainer:{
         marginTop:80,
         alignItems:'center'

    },bioContainer:{
        alignItems:'center'
    },
    profile:{
        width:180,
        height:180,
        borderRadius:90,
        borderWidth:3,
        borderColor:colors.inputBackground,
        resizeMode:'cover',
        marginBottom:20
    },
    text:{
        fontSize:18,marginBottom:20,
        textAlign:'center'
    }
})