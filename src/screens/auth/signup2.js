import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, serverAddress } from 'frontend/src/utils/index'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'
import { images } from 'frontend/src/utils/index.js'
import { basicInfoContext } from '../Main';





export default function Signup2({ route }) {



    let info = useContext(basicInfoContext)

    const { name, email, password } = route.params;

    const [image, setimage] = useState(images.dummy)
    const [phone, setphone] = useState()
    const [address, setaddress] = useState()

    const [openSingle, setOpenSingle] = useState(false);
    const [degree, setdegree] = useState(null);
    const [degreeOptions, setdegreeOptions] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);


    const [openMultiple, setOpenMultiple] = useState(false);
    const [skills, setskills] = useState(null);
    const [skillsOptions, setskillsOptions] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);


    const reference = storage().ref(`/profiles/${email}`);

    const handlePicker = () => {


        ImagePicker.launchImageLibrary(options = {
            mediaType: 'photo'
        }, async (res) => {

            let imgs = res.assets[0].uri;
            //setimage(imgs);
           

            imgs = imgs.toString();


            try {
                const task = reference.putFile(imgs);
                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });
                task.then(async () => {
                    console.log('Image uploaded to the bucket!');
                    setimage(await reference.getDownloadURL())
                    console.log(image);

                });
            } catch (error) {
                console.log(error)
            }




        })
    }



    const signUp = () => {
        const finalData = {
            name: name,
            email: email,
            password: password,
            address: address,
            phone: phone,
            education: degree,
            skills: skills,
            profileImage: image
        }

        if (finalData.profileImage === 3) {
            finalData.profileImage = null
        }

        try {
            finalData.education = finalData.education.toString();
            finalData.skills = finalData.skills.toString();
        } catch (error) {
               console.log(error)
        }




        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(finalData),
        }



        fetch(`${serverAddress.baseurl}/signup`, options).then(
            (response) => response.text()
        ).then(
            async (response) => {

                if (response === 'already') { alert("User Already Registered") }
                else if (response === 'failed') {
                    alert("Failed Try Again")
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


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => handlePicker()}>
                        {
                            (image === 3) ?
                                <Image source={image} style={styles.profile} /> :
                                <Image source={{ uri: image }} style={styles.profile} />

                        }
                    </TouchableOpacity>
                    <InputField placeholder="Phone" handleChange={(text) => setphone(text)} />
                    <InputField placeholder="Address" handleChange={(text) => setaddress(text)} />

                    <DropDownPicker
                        disableBorderRadius={true}
                        style={{ backgroundColor: colors.inputBackground, borderWidth: 0, borderRadius: 10, marginBottom: 10 }}


                        open={openSingle}
                        value={degree}
                        items={degreeOptions}
                        setOpen={setOpenSingle}
                        setValue={setdegree}
                        setItems={setdegreeOptions}
                    />

                    <DropDownPicker

                        multiple={true}
                        max={5}
                        disableBorderRadius={true}
                        style={{ backgroundColor: colors.inputBackground, borderWidth: 0, borderRadius: 10, marginBottom: 10 }}

                        zIndex={1000}
                        open={openMultiple}
                        value={skills}
                        items={skillsOptions}
                        setOpen={setOpenMultiple}
                        setValue={setskills}
                        setItems={setskillsOptions}
                    />

                    <BtnComponent text="SIGN UP" onPress={async () => signUp()} color={colors.primary} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightPrimary,
        padding: 20,
    },
    inputContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center'
    },
    profile: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 3,
        borderColor: colors.inputBackground,
        resizeMode: 'cover',
        marginBottom: 20
    }
})