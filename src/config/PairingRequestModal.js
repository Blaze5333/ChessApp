/*eslint-disable*/
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PairingRequestModal = ({ visible, notification, onAccept, onReject }) => {
  return (
    <Modal transparent visible={notification.visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>New Challenge!</Text>
            <Text style={styles.chessIcon}>♟️</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>
              You've received a chess challenge
            </Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Opponent:</Text>
                <Text style={styles.value}>
                  {notification.opponentAddress?.slice(0, 6)}...{notification.opponentAddress?.slice(-4)}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label}>Stake:</Text>
                <Text style={styles.value}>{notification.stakeAmount} USDC</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label}>Room:</Text>
                <Text style={styles.value}>{notification.room}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.rejectButton]}
                onPress={onReject}
              >
                <Text style={styles.rejectButtonText}>Decline</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.acceptButton]}
                onPress={onAccept}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  chessIcon: {
    fontSize: 24,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#f3f4f6',
  },
  acceptButton: {
    backgroundColor: '#1a1a1a',
  },
  rejectButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PairingRequestModal;