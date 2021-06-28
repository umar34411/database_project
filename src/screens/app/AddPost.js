import React, { useState , useContext  , useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native'
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import InputField from '../../components/InputField'
import { colors, images } from '../../utils/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BtnComponent from '../../components/BtnComponent'
import { basicInfoContext } from '../Main';


export default function AddPost({navigation}) {


    let info = useContext(basicInfoContext)

    const [title, settitle] = useState(null)
    const [postImage, setpostImage] = useState(null)
    const [email, setemail] = useState()
    const [token, settoken] = useState()
    var reference=null;
    

    const handlePicker = async() => {
        ImagePicker.launchImageLibrary(options = {
            mediaType: 'photo',
            quality: 0.3
        },async (res) => {
            let imgs = res.assets[0].uri;
            
            imgs = imgs.toString();
           
            
            try {
                let timeStamp=Date.parse(new Date());
                reference = storage().ref(`/posts/${timeStamp}`);
                const task = reference.putFile(imgs);
                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });
                task.then(async () => {
                    console.log('Image uploaded to the bucket!');
                    setpostImage(await reference.getDownloadURL())
                    

                });
            } catch (error) {
                console.log(error)
            }
        })
    }


   useEffect(() => {
       setemail(info.email)
       settoken(info.token)
   }, [])




   const uploadPost = () => {


    //  if(title===null && postImage===null)
    //  {
    //      alert("Add image or title");
    //      return
    //  }


    const finalData = {
        title:title,
        postImage:postImage
    }

   

    




    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'authorization':token
        },
        body: JSON.stringify(finalData),
    }



    fetch(`${serverAddress.baseurl}/posts`, options).then(
        (response) => response.text()
    ).then(
        async (response) => {

            if (response === 'unauthorized') { alert("Invalid User") }
            else if (response === 'failed') {
                alert("Failed Try Again")
            } else {
                settitle('')
                setpostImage(null)
               navigation.navigate('home')
               console.log("success")
            }
        }
    ).catch(
        (error) => console.log("fetch :" + error)
    )


}


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.contentConainer}>
                    <InputField placeholder="Title" value={title} handleChange={(text) => settitle(text)} />
                    <TouchableOpacity onPress={()=>handlePicker()} style={{width:'100%', alignItems:'center'}}>
                        {
                        (postImage!=null) ? <Image source={{uri:postImage}} style={styles.postImg} /> :
                         <FontAwesome5 name="image" color="white" size={200} />
                        }
                    </TouchableOpacity>

                    <BtnComponent text="POST" onPress={() => uploadPost()} color={colors.primary} />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex:1,
            backgroundColor: colors.lightPrimary,
           
            paddingHorizontal: 20,

        },
        contentConainer: {
            flex:1,
            alignItems: 'center',
            marginTop:80,
           

           
        },
        postImg: {
            width:'100%',
            height: 400,
            borderRadius: 10,
            resizeMode: 'cover',
            marginBottom:10
            
            

        }
    }
)