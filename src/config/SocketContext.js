/*eslint-disable*/
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Modal, View,Text } from 'react-native';
import PairingRequestModal from './PairingRequestModal';
const SocketContext = createContext();

export const SocketProvider=({children})=> {
    const [socket, setSocket] = useState(null);
    const [notification, setNotification] = useState({
      visible: false,
       opponentAddress:'',
       stakeAmount:'',
       room:''
    });
    const userAddress = useSelector((state) => state.user.userAddress);
    useEffect(() => {
        // Only create socket connection if applicantId exists
        if (userAddress) {
          const newSocket = io('http://192.168.29.36:9000/', {
            transports: ['websocket'],
            reconnection: true
          });
    
          newSocket.on('connect', () => {
            console.log('Connected to notification socket');
            newSocket.emit('join_notification', { userAddress: `${userAddress}` });
          });
    
          newSocket.on('pairing_request', (data) => {
            console.log('New message notification received:', data);
            setNotification({
              visible: true,
              opponentAddress: data.senderAddress,
              stakeAmount: data.stakeAmount,
              room: data.room
            });
    
          });
    
          setSocket(newSocket);
    
          return () => {
            newSocket.disconnect();
          };
        }
        
        // If applicantId doesn't exist, cleanup any existing socket
        return () => {
          if (socket) {
            socket.disconnect();
            setSocket(null);
          }
        };
      }, [userAddress]);
  return (
    <SocketContext.Provider value={{socket,notification,setNotification}}>
        {children}
        <PairingRequestModal 
  visible={notification.visible}
  notification={notification}
  onAccept={() => {
    // Handle accept
    setNotification(prev => ({ ...prev, visible: false }));
  }}
  onReject={() => {
    // Handle reject
    setNotification(prev => ({ ...prev, visible: false }));
  }}
/>
</SocketContext.Provider>
  )
}
export const useSocket = () => useContext(SocketContext);
