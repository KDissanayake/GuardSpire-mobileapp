import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          {/* Logo */}
          <Image
            source={require('../assets/Logo.png')} // Replace with your actual logo path
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>GUARD SPIRE</Text>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon
                name={passwordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              console.log("Sign In pressed");
              navigation.navigate("Main"); // ✅ Redirect to Drawer, which starts in Dashboard
            }}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          {/* Sign Up Redirect */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => console.log('Google Sign-In pressed')}>
            <Image
              source={require('../assets/search.png')} // Replace with actual Google icon
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    letterSpacing: 7,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    marginTop: 30,
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  forgotText: {
    marginBottom: 150,
    color: 'black',
    fontSize: 14,
    textAlign: 'right',
  },
  signInButton: {
    backgroundColor: '#04366D',
    paddingVertical: 12,
    paddingHorizontal: 110,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 14,
    color: '#000',
  },
  signUpLink: {
    color: '#04366D',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04366D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
