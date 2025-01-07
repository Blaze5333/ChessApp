/*eslint-disable*/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import MainScreen from './src/screens/MainScreen';
import ChessPairingScreen from './src/screens/PairingScreen';
export default function Navigation() {
    const Stack=createNativeStackNavigator()
  return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
         <Stack.Screen name='MainScreen' component={MainScreen}/>
         <Stack.Screen name='PairingScreen' component={ChessPairingScreen}/>
     </Stack.Navigator>
  )
}
