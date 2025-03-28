import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, StatusBar,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.leftContainer}>
        {/* ✅ Fix: Use openDrawer() properly */}
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.iconButton}>
          <Icon name="bars" size={30} color="black" />
        </TouchableOpacity>

        {/* App Logo */}
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* User Profile Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={styles.iconButton}>
        <Image
          source={require('../assets/user.png')}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 0,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
});

export default TopNavBar;
