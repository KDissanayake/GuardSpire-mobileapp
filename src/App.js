import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import SignInScreen from '../src/screens/SignInScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import DashboardScreen from '../src/screens/DashboardScreen';
import ManualScannerScreen from '../src/screens/ManualScannerScreen';
import ReportScreen from '../src/screens/ReportScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import CustomDrawer from '../src/components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ **Drawer Navigation (Main App After Login)**
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard" // ✅ Start in Dashboard first
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: 300},
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="ManualScanner" component={ManualScannerScreen} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

// ✅ **Stack Navigation (Handles Login & Drawer)**
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Authentication Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        {/* ✅ After Login, go to Drawer Navigator (Dashboard first) */}
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
