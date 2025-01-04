/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChessPairingScreen = () => {
  const [address, setAddress] = useState('');
  const [isPending, setPending] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  // Animation values
  const bounceValue = useSharedValue(0);
  const rotateValue = useSharedValue(0);
  const dotOpacity1 = useSharedValue(0);
  const dotOpacity2 = useSharedValue(0);
  const dotOpacity3 = useSharedValue(0);

  // Colors based on theme
  const colors = {
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    inputBackground: isDarkMode ? '#333333' : '#f5f5f5',
    border: isDarkMode ? '#404040' : '#e0e0e0',
    placeholder: isDarkMode ? '#808080' : '#666666',
    button: isDarkMode ? '#ffffff' : '#000000',
    buttonText: isDarkMode ? '#000000' : '#ffffff',
  };

  useEffect(() => {
    // Knight bounce animation
    bounceValue.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 2, stiffness: 80 }),
        withSpring(0, { damping: 2, stiffness: 80 })
      ),
      -1,
      true
    );

    // Waiting dots animation
    if (isPending) {
      dotOpacity1.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        true
      );
      dotOpacity2.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 500 }),
          withTiming(1, { duration: 500 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        true
      );
      dotOpacity3.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 500 }),
          withTiming(0.3, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    }
  }, [isPending]);

  const knightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(bounceValue.value, [0, 1], [0, -20]),
        },
      ],
    };
  });

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dotOpacity1.value,
  }));
  const dot2Style = useAnimatedStyle(() => ({
    opacity: dotOpacity2.value,
  }));
  const dot3Style = useAnimatedStyle(() => ({
    opacity: dotOpacity3.value,
  }));

  const handleChallenge = () => {
    setPending(true);
    // Add your blockchain challenge logic here
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Animated Knight Symbol */}
        <Animated.Text style={[styles.knight, knightStyle, { color: colors.text }]}>
          ♞
        </Animated.Text>

        <Text style={[styles.title, { color: colors.text }]}>Challenge Opponent</Text>
        <Text style={[styles.subtitle, { color: colors.placeholder }]}>
          Enter your opponent's address to start a match
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="0x..."
            placeholderTextColor={colors.placeholder}
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.button },
            isPending && styles.buttonDisabled,
          ]}
          onPress={handleChallenge}
          disabled={isPending}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            {isPending ? 'Waiting for Response...' : 'Send Challenge'}
          </Text>
        </TouchableOpacity>

        {isPending && (
          <View style={styles.loadingContainer}>
            <View style={styles.dotsContainer}>
              <Animated.View
                style={[styles.dot, dot1Style, { backgroundColor: colors.text }]}
              />
              <Animated.View
                style={[styles.dot, dot2Style, { backgroundColor: colors.text }]}
              />
              <Animated.View
                style={[styles.dot, dot3Style, { backgroundColor: colors.text }]}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knight: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    marginTop: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ChessPairingScreen;