import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FaCheckCircle } from 'react-icons/fa'; // Only if you need green check (use optional)

const SignInScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Modal states
  const [step, setStep] = useState(null);
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const correctOtp = '123456'; // ✅ mock

  const handleOtpVerify = () => {
    if (otpInput === correctOtp) {
      setIsOtpVerified(true);
      setErrorMsg('');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 2) {
        setOtpSent(true);
        setErrorMsg('');
      } else {
        setErrorMsg('* Incorrect password. Please try again.');
      }
    }
  };

  const resetAll = () => {
    setStep(null);
    setEmail('');
    setOtpInput('');
    setOtpSent(false);
    setAttempts(0);
    setIsOtpVerified(false);
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>GUARD SPIRE</Text>

          <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#888" keyboardType="email-address" />

          <View style={styles.passwordContainer}>
            <TextInput style={styles.inputPassword} placeholder="Enter your password" placeholderTextColor="#888" secureTextEntry={!passwordVisible} />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => setStep('email')}>
              <Text style={styles.forgotText}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate("Main")}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google Sign-In pressed')}>
            <Image source={require('../assets/search.png')} style={styles.googleIcon} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <Modal visible={step === 'email'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Forget Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your current email address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => setStep('otpSent')}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={step === 'otpSent'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>
              "We have sent a one-time password to your email. Enter it in the current password box to reset your password."
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setStep('reset')}>
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={step === 'reset'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.resetModal}>
            <Text style={styles.modalTitle}>Password</Text>

            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your one time password"
              value={otpInput}
              onChangeText={setOtpInput}
              editable={!isOtpVerified}
            />
            {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            {otpSent && !isOtpVerified ? <Text style={styles.otpInfo}>We've sent an OTP to your email. Please check and try again.</Text> : null}
            {isOtpVerified ? <Text style={styles.successText}>✓ OTP verified successfully!</Text> : null}

            {!isOtpVerified && (
              <TouchableOpacity style={styles.verifyButton} onPress={handleOtpVerify}>
                <Text style={styles.modalButtonText}>Verify</Text>
              </TouchableOpacity>
            )}

            {/* New Password */}
            <View pointerEvents={isOtpVerified ? 'auto' : 'none'} opacity={isOtpVerified ? 1 : 0.5}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Re-enter new password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={() => setStep('success')} disabled={!isOtpVerified}>
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={step === 'success'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.successTitle}>Changes have been Updated</Text>
            <Text style={styles.modalSubtext}>Thank You!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetAll}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  logo: {
    width: 250,
    height: 250,
    marginTop: 10,
    marginBottom: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#04366D',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 20,
  },
  modalSubtext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#04366D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 60,
    marginRight: 60,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
  resetModal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    width: 330,
  },
  label: {
    fontWeight: 'bold',
    color: '#04366D',
    marginBottom: 0,
  },
  errorMsg: {
    color: 'red',
    fontSize: 11,
    marginBottom: 5,
  },
  otpInfo: {
    color: 'red',
    fontSize: 11,
    marginBottom: 5,
  },
  successText: {
    color: 'green',
    fontSize: 13,
    marginBottom: 25,
  },
  verifyButton: {
    backgroundColor: '#04366D',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
    textAlign: 'center',
    margin: 70,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SignInScreen;
