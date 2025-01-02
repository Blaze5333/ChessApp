/*eslint-disable*/
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const OnBoardingScreen=()=> {
  return (
    <View style={style.screen} >
      <View style={{height:"55%",width:'100%',alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../assets/icons/chessBackground.png')}  style={{height:"100%",resizeMode:"contain",width:'85%'}}/>
      </View>
      <View style={{flex:1,alignItems:"center"}}>
         <Text style={style.text}>Play Chess.</Text>
         <Text style={style.text} >Stake USDC.</Text>
        <Text style={style.text}>Win Big!</Text>
        <TouchableOpacity style={{height:50,width:'80%',backgroundColor:'black',borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:40}}>
        <Text style={{fontFamily:"Inter-ExtraBold",fontSize:20,color:'white'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:"white"
    },
    text:{
      fontFamily:"Inter-ExtraBold",
      color:'black',
      fontSize:25,
      marginBottom:15

    }

})
export default OnBoardingScreen