import 'react-native-gesture-handler';
import React, { createContext, useState } from 'react'

import MainAuthNavigator from '../Navigation/auth/MainAuthNavigator';


const basicInfoContext=createContext();

export default function Main() {

  const [token, settoken] = useState('this is token')
  const [email, setemail] = useState("umar")

  const basicInfo = {
    token,
    settoken,
    email,
    setemail
  }

  


  return (

    <basicInfoContext.Provider value={basicInfo}>
    <MainAuthNavigator />
    </basicInfoContext.Provider>
   

  )
}

export {basicInfoContext}

