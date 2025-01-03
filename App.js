/*eslint-disable*/
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChessSplashScreen from './src/components/ChessSplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ChessSplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <Stack.Navigator 
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
          <Stack.Screen name='MainScreen' component={MainScreen}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;