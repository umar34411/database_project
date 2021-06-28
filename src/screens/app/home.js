import React ,{useContext, useState , useEffect} from 'react'
import { View, Text, StyleSheet, FlatList , SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompletePost from '../../components/completePost'
import { colors, images, serverAddress } from '../../utils'
import { basicInfoContext } from '../Main'


export default function Home() {
    

    // [
    //     {
    //       id:1,
    //       ownerProfileLink:images.profile,
    //       ownerName:"ahmad",
    //       email:"ahamd@gmail.com",
    //       title:"Happy Coding",
    //       postImage:images.welcomeBackground
    //     },
    //     {
    //         id:2,
    //         ownerProfileLink:images.profile,
    //         ownerName:"ahmad",
    //         email:"ahamd@gmail.com",
    //         title:"Happy Coding",
    //         postImage:images.welcomeBackground
    //       },
    //       {
    //         id:3,
    //         ownerProfileLink:images.profile,
    //         ownerName:"ahmad",
    //         email:"ahamd@gmail.com",
    //         title:"Happy Coding",
    //         postImage:images.welcomeBackground
    //       }
    // ]

    const [token, settoken] = useState()

    const info=useContext(basicInfoContext)


    const [posts, setposts] = useState()


    const getToken=async()=>{
        try {
            const temp=await AsyncStorage.getItem('token')
        settoken(temp)
        } catch (error) {
            console.log(error)
        }
        
   }

    const getPosts=async()=>{
     
        

        const options={
            method:"GET",
            headers:{
                'Content-Type':'Application/json',
                'authorization':token
            }
            
        }


        fetch(`${serverAddress.baseurl}/posts/all`,options).then(
            (response)=>response.json()
        ).then(
            (response)=>{
                setposts(response)
                console.log(response)
                
            }
        ).catch(
            (error)=>console.log(error)
        )


    }


    useEffect(() => {
        getToken()
        getPosts()
    }, [token])

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
           <FlatList
            ItemSeparatorComponent={()=><View style={
                {
                    height:2,
                    width:300,
                    backgroundColor:colors.divider,
                    alignSelf:'center',
                    marginVertical:10

                }
            }/>}
            data={posts}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>
            <CompletePost ownerImage={item.ownerProfileLink} ownerName={item.ownerName} email={item.email} postTitle={item.title} postImage={item.postImage}/>
         }

           />
        </View>
        </SafeAreaView>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:5,
        backgroundColor:colors.lightPrimary
    }
})