import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button, FlatList, Dimensions } from 'react-native'
import { colors, images } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';


import CompletePost from '../../components/completePost'
import AccountComponent from '../../components/accountComponent'
import BtnComponent from '../../components/BtnComponent'
import { basicInfoContext } from '../Main'

export default function Account({ navigation }) {

    const [accountDetails, setaccountDetails] = useState()

    const [ctoken, setctoken] = useState()
    let info = useContext(basicInfoContext)

    const [posts, setposts] = useState()

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('email')
        await info.setemail(null)
        await info.settoken(null)
    }


    const getToken = async () => {
        const temp = await AsyncStorage.getItem('token')
        setctoken(temp)
    }

    const getAccountDetails = async () => {


        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json',
                'authorization': ctoken
            }

        }


        fetch(`${serverAddress.baseurl}/account/user`, options).then(
            (response) => response.json()
        ).then(
            (response) => {
                setaccountDetails(response[0])
                console.log(response)

            }
        ).catch(
            (error) => console.log(error)
        )


    }

    const getPosts = async () => {
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json',
                'authorization': ctoken
            }

        }


        fetch(`${serverAddress.baseurl}/account/user/posts`, options).then(
            (response) => response.json()
        ).then(
            (response) => {
                setposts(response)
                console.log(response)

            }
        ).catch(
            (error) => console.log(error)
        )

    }

    useEffect(() => {
        getToken();
        getAccountDetails();
        getPosts();
    }, [ctoken])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    {
                        (!accountDetails)?(null):
                        <AccountComponent image={accountDetails.profileImage} name={accountDetails.name} email={accountDetails.email} />
                    }
                </View>


                <View style={styles.custom}>
                    <BtnComponent text="Edit" onPress={() => navigation.navigate('edit',{accountDetails:accountDetails,token:ctoken})} color={colors.primary} customization={{ width: 150, padding: 5, marginHorizontal: 5 }} />
                    <BtnComponent text="Log Out" onPress={() => logout()} color={colors.primary} customization={{ width: 150, padding: 5, marginHorizontal: 5 }} />
                </View>

                <View style={
                    {
                        height: 2,
                        width: Dimensions.get('screen').width - 20,
                        backgroundColor: colors.darkPrimary,
                        alignSelf: 'center',
                        marginVertical: 10

                    }
                } />



                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                    <Text style={styles.portionTitle}>
                        POSTS
                    </Text>
                </View>

                <View style={styles.postsContainer}>
                    <FlatList
                        ItemSeparatorComponent={() => <View style={
                            {
                                height: 2,
                                width: 300,
                                backgroundColor: colors.divider,
                                alignSelf: 'center',
                                marginVertical: 10

                            }
                        } />}
                        data={posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                       ( 
                            
                            (!posts)?(null):
                            <CompletePost ownerImage={item.ownerProfileLink} ownerName={item.ownerName} email={item.email} postTitle={item.title} postImage={item.postImage} />
                        
                        )
                        }

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.lightPrimary,
        height: Dimensions.get('screen').height,
    },
    postsContainer: {
        marginTop: 10,
        flex: 1
    },
    portionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: colors.secondaryText
    },
    custom: {
        alignSelf: 'center',
        flexDirection: 'row',

    }
})
