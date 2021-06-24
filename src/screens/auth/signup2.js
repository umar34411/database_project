import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image , TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'react-native-image-picker';

import { colors } from 'frontend/src/utils/index'
import InputField from '../../components/InputField'
import BtnComponent from '../../components/BtnComponent'
import { images } from 'frontend/src/utils/index.js'





export default function Signup2({ route }) {




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


const [img, setimg] = useState("hlo")

    const handlePicker = () => {


        ImagePicker.launchImageLibrary(options = {
            mediaType: 'photo'
        }, async (res) => {
           
           let imgs=res.assets[0].uri;
            setimage(imgs);
            console.log(image)
        })
    }





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={()=>handlePicker()}>
                    
                        
                        <Image source={uri=image} style={styles.profile} />
                    
                    </TouchableOpacity>
                    <InputField placeholder="Phone" handleChange={() => (text) => setemail(text)} />
                    <InputField placeholder="Address" handleChange={() => (text) => setemail(text)} />

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

                    <BtnComponent text="SIGN UP" onPress={async () => console.log(name, email, password)} color={colors.primary} />
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