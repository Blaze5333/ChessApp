/*eslint-disable*/
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const ChessSplashScreen = ({ onFinish }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const loadingProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo entrance
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Tagline fade in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Loading progress
      Animated.timing(loadingProgress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Callback when animations finish
      setTimeout(onFinish, 500);
    });
  }, []);

  // Interpolate rotation for the chess piece
  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* Animated chess piece logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { scale: logoScale },
              { rotate: spin },
            ],
          },
        ]}
      ><View style={{backgroundColor:'white',height:100,width:100,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
            <Image source={require("../assets/icons/logo.png")} style={{height:60,width:60}}/>
      </View>
      </Animated.View>

      {/* App name */}
      <Text style={styles.appName}>CHESS STAKES</Text>

      {/* Animated tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: taglineOpacity,
          },
        ]}
      >
        Where Strategy Meets Stakes
      </Animated.Text>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: loadingProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 3, 0.9)',
    borderRadius: 20,
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily:"Inter-Medium"
  },
  tagline: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 50,
    fontStyle: 'italic',
    letterSpacing: 0.5,
    fontFamily:"Inter-Bold"
  },
  loadingContainer: {
    width: width * 0.7,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 20,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
});
export default ChessSplashScreen