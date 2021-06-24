import React , {useState} from 'react'
import { View, Text , StyleSheet ,SafeAreaView , Image } from 'react-native'
import InputField from '../../components/InputField'
import {colors, images} from '../../utils/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BtnComponent from '../../components/BtnComponent'

export default function AddPost() {

    const [title, settitle] = useState()
    const [image, setimage] = useState(images.dummy)

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        
           <View style={styles.contentConainer}>
           <InputField placeholder="Title" handleChange={(text)=>settitle(text)} />
           {image ? <Image source={image} style={styles.postImg}/> : <FontAwesome5 name="image" color="white" size={200}/>
              }

              <BtnComponent text="POST"  onPress={()=>console.log("post")} color={colors.primary}/>
           </View>
        </View>
        </SafeAreaView>
    )
}


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:colors.lightPrimary,
            alignItems:'center',
            paddingHorizontal:20
        },
        contentConainer:{
          width:'100%',
          alignItems:'center',
          marginTop:80
        },
        postImg:{
            width:'100%',
            height:500,
            borderRadius:10,
            resizeMode:'cover'
        }
    }
)