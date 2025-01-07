/*eslint-disable*/
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChessSplashScreen from './src/components/ChessSplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import MainScreen from './src/screens/MainScreen';
import ChessPairingScreen from './src/screens/PairingScreen';
import Navigation from './Navigation';
import { SocketProvider } from './src/config/SocketContext';
import {Provider} from 'react-redux';
import { store,persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ChessSplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <Provider store={store}>
        <PersistGate persistor={persistor} >
        <SocketProvider>
        <Navigation/>
        </SocketProvider>
        </PersistGate>
        </Provider>
       
       
      )}
    </NavigationContainer>
  );
};

export default App;