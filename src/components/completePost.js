import React from 'react'
import { View, Text, StyleSheet, Dimensions ,Image } from 'react-native'

import AccountComponent from './accountComponent'
import { colors, images } from '../utils/index'


export default function CompletePost({ownerImage,ownerName,email,postTitle,postImage}) {
    return (
        <View style={styles.container}>
           <AccountComponent image={ownerImage} name={ownerName} email={email}/>
           <View style={styles.postContainer}>
            {postTitle && <Text style={styles.title}>{postTitle}</Text>}
            {postImage && <Image source={ {uri:postImage} } style={styles.postImage}/> }
           </View>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        borderRadius:10,
        overflow:'hidden',
        marginBottom:4,
        backgroundColor:colors.lightPrimary,
       
        
    },
    postContainer:{
       
        marginTop:10
    },
    title:{
        paddingHorizontal:10
    },
    postImage:{
        width:"100%",//Dimensions.get('screen').width-40,
        height:400,
        resizeMode:'cover',
        borderRadius:5,
        marginTop:5
    }
    
})