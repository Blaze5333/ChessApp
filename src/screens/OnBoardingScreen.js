/*eslint-disable*/
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View ,ScrollView, Dimensions} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserAddress } from '../redux/userSlice';
const {height,width}=Dimensions.get('window');

const OnBoardingScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const getStarted=()=>{
    dispatch(setUserAddress("0x2dr"))
    navigation.navigate('MainScreen')
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/icons/chessBackground.png')} 
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Play Chess.</Text>
          <Text style={styles.titleText}>Stake USDC.</Text>
          <Text style={styles.titleText}>Win Big!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
          
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.buttonText}>Connect Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getStarted} style={styles.startButton}>
            <Text style={[styles.buttonText,{color:'white'}]}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height,
    width,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 0.45*height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '85%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleText: {
    fontFamily: 'Inter-ExtraBold',
    color: 'black',
    fontSize: 28,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color:"black"
  },
  connectButton: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  startButton: {
    height: 50,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 18,
    color: 'black',
  },
});

export default OnBoardingScreen;