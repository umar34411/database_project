import React ,{useState} from 'react'
import { View, Text, StyleSheet, FlatList , SafeAreaView } from 'react-native'
import CompletePost from '../../components/completePost'
import { colors, images } from '../../utils'



export default function Home() {
    
    const [posts, setposts] = useState([
        {
          id:1,
          ownerProfileLink:images.profile,
          ownerName:"ahmad",
          email:"ahamd@gmail.com",
          title:"Happy Coding",
          postImage:images.welcomeBackground
        },
        {
            id:2,
            ownerProfileLink:images.profile,
            ownerName:"ahmad",
            email:"ahamd@gmail.com",
            title:"Happy Coding",
            postImage:images.welcomeBackground
          },
          {
            id:3,
            ownerProfileLink:images.profile,
            ownerName:"ahmad",
            email:"ahamd@gmail.com",
            title:"Happy Coding",
            postImage:images.welcomeBackground
          }
    ])



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
            keyExtractor={item=>item.id.toString()}
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