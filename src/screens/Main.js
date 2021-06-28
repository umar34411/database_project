import 'react-native-gesture-handler';
import React, { createContext, useState ,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainAuthNavigator from '../Navigation/auth/MainAuthNavigator';
import MainAppNavigator from '../Navigation/app/MainAppNavigator'

const basicInfoContext=createContext();

export default function Main() {

  const [token, settoken] = useState()
  const [email, setemail] = useState()
  

const initializer=async()=>{
  const temptoken=await AsyncStorage.getItem("token");
  settoken(temptoken)
  const tempemail=await AsyncStorage.getItem("email");
  setemail(tempemail)
   
}

   useEffect(() => {
     
    initializer()
      
     
   }, [])

  const basicInfo = {
    token,
    settoken,
    email,
    setemail
  }

  
  

  if(!token || token===null)
  {
  return (
    <basicInfoContext.Provider value={basicInfo}>
    <MainAuthNavigator />
    </basicInfoContext.Provider>
  )}
  else{
    return(
    <basicInfoContext.Provider value={basicInfo}>
    <MainAppNavigator />
    </basicInfoContext.Provider>
    )
  }
}

export {basicInfoContext}

