import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView,} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import TopNavBar from '../components/TopNavBar';
import BottomNavBar from '../components/BottomNavBar';
import CustomDrawer from '../components/CustomDrawer';

const DashboardScreen = ({navigation}) => {
  const [scanProgress, setScanProgress] = useState(0.85); // Initial Quick Scan percentage

  // Function to update Quick Scan circle
  const handleQuickScan = () => {
    const newProgress = Math.random() * (1 - 0.5) + 0.5; // Random progress between 50% - 100%
    setScanProgress(newProgress);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <TopNavBar navigation={navigation} />

      {/* Scrollable Dashboard Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Circular Progress Bar Section */}
        <View style={[styles.card, styles.centerContent]}>
          <TouchableOpacity>
            <View style={styles.circleWrapper}>
              <CircularProgress progress={scanProgress} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickScanButton}
            onPress={handleQuickScan}>
            <Text style={styles.quickScanText}>Quick Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Security Model Integrity Section */}
        <Text style={styles.sectionTitle}>Security Model Integrity</Text>
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>Stable</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '70%', backgroundColor: 'green'},
                ]}
              />
            </View>
            <Text style={styles.statusPercent}>70%</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>Suspicious</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '90%', backgroundColor: 'yellow'},
                ]}
              />
            </View>
            <Text style={styles.statusPercent}>90%</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>Critical</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '50%', backgroundColor: 'red'},
                ]}
              />
            </View>
            <Text style={styles.statusPercent}>50%</Text>
          </View>
        </View>

        {/* Recent Scam Alerts */}
        <Text style={styles.sectionTitle}>Recent Scam Alerts</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.alertRow}
            onPress={() => navigation.navigate('Report')}>
            <Text style={styles.alertText}>Phishing Attack</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '100%', backgroundColor: 'red'},
                ]}
              />
            </View>
            <Text style={styles.alertPercent}>100%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alertRow}
            onPress={() => navigation.navigate('Report')}>
            <Text style={styles.alertText}>Job Scam</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '85%', backgroundColor: 'yellow'},
                ]}
              />
            </View>
            <Text style={styles.alertPercent}>85%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alertRow}
            onPress={() => navigation.navigate('Report')}>
            <Text style={styles.alertText}>Sampath Bank</Text>
            <View style={styles.bar}>
              <View
                style={[
                  styles.progressBar,
                  {width: '60%', backgroundColor: 'green'},
                ]}
              />
            </View>
            <Text style={styles.alertPercent}>60%</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} onQuickScan={handleQuickScan} />
    </View>
  );
};

/* Custom Circular Progress Component */
const CircularProgress = ({progress}) => {
  const size = 160;
  const strokeWidth = 20;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress);

  return (
    <View style={styles.circleContainer}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#04366D" />
            <Stop offset="40%" stopColor="#04366D" />
            <Stop offset="100%" stopColor="#04366D" />
          </LinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#A2AEE4"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Foreground Progress Arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="none"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>

      {/* Percentage Text */}
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 125,
    paddingHorizontal: 25,
    paddingBottom: 160,
  },
  card: {
    backgroundColor: '#F0EEEE',
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 38,
    color: '#04366D',
    width: '100%',
    top: 55,
    fontFamily: 'Poppins-Bold',
  },
  quickScanButton: {
    backgroundColor: '#04366D',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 110,
  },
  quickScanText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#04366D',
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progressBar: {
    height: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    width: 100,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertText: {
    width: 120,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  alertPercent: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#04366D',
  },
});

export default DashboardScreen;
