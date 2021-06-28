import React from 'react'
import { View, Text , StyleSheet ,Image} from 'react-native'
import { colors, images } from '../utils'

export default function AccountComponent({image,name,email}) {

    

    return (
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.profile}/>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>
                  {name}
              </Text>
              <Text style={styles.email}>
                  {email}
              </Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:colors.lightPrimary,
        padding:10,
       
       
        flexDirection:'row'
    },
    profile:{
        width:60,
        height:60,
        borderRadius:30,
        borderColor:colors.inputBackground,
        borderWidth:2,
        resizeMode:'cover'
    },
    infoContainer:{
        padding:7
        
    },
    name:{
       fontSize:18,
       fontWeight:'bold'
    },
    email:{
        color:colors.secondaryText
    }

})