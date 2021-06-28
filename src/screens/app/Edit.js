import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import { colors } from 'frontend/src/utils/index'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'
import { images } from 'frontend/src/utils/index.js'



export default function Edit({ route }) {

    const { accountDetails, token } = route.params
    const [email, setemail] = useState(accountDetails.email)
    const [image, setimage] = useState(accountDetails.profileImage)
    const [phone, setphone] = useState(accountDetails.phone)
    const [address, setaddress] = useState(accountDetails.address)







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




    useEffect(() => {


        setdegree(accountDetails.education)
        setskills((accountDetails.skills).split(','))


    }, [])

    const reference = storage().ref(`/profiles/`);

    const handlePicker = () => {

        reference.delete()
        // ImagePicker.launchImageLibrary(options = {
        //     mediaType: 'photo',
        //     quality: 0.5
        // }, async (res) => {

        //     let imgs = res.assets[0].uri;
        //     //setimage(imgs);


        //     imgs = imgs.toString();


        //     try {
        //         const task = reference.putFile(imgs);
        //         task.on('state_changed', taskSnapshot => {
        //             console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        //         });
        //         task.then(async () => {
        //             console.log('Image uploaded to the bucket!');
        //             setimage(await reference.getDownloadURL())
        //             console.log(image);

        //         });
        //     } catch (error) {
        //         console.log(error)
        //     }




        // })
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


                    <InputField value={phone} placeholder="Phone" handleChange={() => (text) => setemail(text)} />
                    <InputField value={address} placeholder="Address" handleChange={() => (text) => setemail(text)} />

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

                    <BtnComponent text="UPDATE" onPress={() => console.log(phone + address)} color={colors.primary} />
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