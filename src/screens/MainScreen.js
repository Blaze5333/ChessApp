/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WalletIcon from "react-native-vector-icons/"
const { height, width } = Dimensions.get('window');

const STAKE_OPTIONS = [
  { amount: 10, text: "Beginner's Arena - Test your skills" },
  { amount: 25, text: "Amateur League - Rise up the ranks" },
  { amount: 50, text: "Intermediate Battle - Strategic minds meet" },
  { amount: 100, text: "Professional Stage - Where legends begin" },
  { amount: 250, text: "Master's Court - Elite competition" },
  { amount: 500, text: "Grandmaster Arena - Supreme challenge" },
  { amount: 1000, text: "Champion's League - Ultimate stakes" },
  {type:"spacer"},
    {type:"spacer"},
];

const CARD_HEIGHT = height * 0.25;
const SPACING = 15;

export default function MainScreen({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userLevel] = useState(12);
  const [progressToNext] = useState(75);
  const [solanaBalance] = useState(1250);
  const [solanaAddress] = useState('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');

  const renderStakeCard = ({ item, index }) => {
    if (item.type === 'spacer') {
      return <View style={{ height: CARD_HEIGHT }} />;
    }
    const inputRange = [
      (index - 1) * CARD_HEIGHT,
      index * CARD_HEIGHT,
      (index + 1) * CARD_HEIGHT
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9]
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7]
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            opacity
          }
        ]}
      >
        <LinearGradient
          colors={['#2C2C2C', '#1A1A1A']}
          style={styles.cardGradient}
        >
        <View style={{flexDirection:"row",alignItems:'center'}}>
        <Text style={styles.stakeAmount}>{item.amount}</Text>
        <Image source={require('../assets/icons/usdc_logo.png')} style={{height:55,width:55}}/>
        </View>
          
          <Text style={styles.stakeText}>{item.text}</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('PairingScreen')}} style={styles.playButton}>
            <Text style={styles.playButtonText}>PLAY NOW</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          
          <View style={{backgroundColor:"white",borderRadius:20,padding:10}}>
            <Text style={{fontFamily:"Inter-Bold",color:"black",fontSize:18}}>{solanaBalance} USDC</Text>
            <Text style={{fontFamily:"Inter-Medium",color:'grey'}}>{truncateAddress(solanaAddress)}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:"center",gap:5,height:70,borderRadius:20,padding:10,backgroundColor:'white'}}>
        <View style={{height:60,width:60,borderRadius:20}}>
          <Image
            source={require('../assets/icons/profile.png')}
            style={{height:'100%',width:"100%",borderRadius:20,resizeMode:'cover'}}
          />
        </View>
        
        <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {userLevel}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progressToNext}%` }]} />
            </View>
            <Image source={require('../assets/icons/trophy.png')} style={{height:35,width:35,position:'absolute',right:0}}/>
            </View>
           
            
          </View>
        </View>
      </View>

      <Animated.FlatList
        style={styles.flatList}
        data={STAKE_OPTIONS}
        renderItem={renderStakeCard}
        keyExtractor={(item,index) => index.toString()}
        contentContainerStyle={styles.carouselContainer}
        snapToInterval={CARD_HEIGHT + SPACING}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  leftHeader: {
    flex: 1,
    marginRight: 15,
  },
  levelContainer: {
    marginBottom: 10,
  },
  walletContainer: {
    marginTop: 5,
  },
  balanceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'Inter-ExtraBold'
  },
  addressText: {
    color: '#CCCCCC',
    fontSize: 12,
     fontFamily:'Inter-Bold'
  },
  levelText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
     fontFamily:'Inter-ExtraBold'
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'black',
    borderRadius: 3,
    overflow: 'hidden',
    width:90
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 25,
    padding:5

  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 105,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  flatList: {
    flex: 1,
  },
  carouselContainer: {
    padding: SPACING,
  },
  card: {
    height: CARD_HEIGHT,
    marginBottom: SPACING,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  stakeAmount: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
     fontFamily:'Inter-ExtraBold'
  },
  stakeText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 20,
     fontFamily:'Inter-ExtraBold'
  },
  playButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
     fontFamily:'Inter-ExtraBold'
  },
});