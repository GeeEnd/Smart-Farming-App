
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import SignupScreen from '../components/SignupScreen';
import DashboardScreen from '../components/DashboardScreen';
import InsectScreen from '../components/InsectScreen';
import mole from '../insects/mole';
import ScanProductScreen from '../components/ScanProductsScreen'; 
import AddCrop from '../components/AddCrop';
import SoilMonitoringScreen from '../components/SoilMonitoringScreen';
import ChatScreen from '../components/ChatScreen';
import SingleChat from '../components/SingleChat';
import MapScreen from '../components/MapScreen';
import AboutDeveloperScreen from '../components/AboutDeveloperScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import EnterCodeScreen from '../components/EnterCodeScreen'
import NewPasswordScreen from '../components/NewPasswordScreen';
import ScanAPIScreen from '../components/ScanAPIScreen';

import PlateNumberScreen from '../components/PlateNumberScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ScanProduct" component={ScanProductScreen} />
      <Stack.Screen name="AddCrop" component={AddCrop} />
      <Stack.Screen name="SoilMonitoring" component={SoilMonitoringScreen} />
      <Stack.Screen name="InsectScreen" component={InsectScreen} />
      <Stack.Screen name="mole" component={mole} />
      <Stack.Screen name="Developers" component={AboutDeveloperScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="ScanAPI" component={ScanAPIScreen} />
      <Stack.Screen name="ScanPlate" component={PlateNumberScreen} />
      
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
