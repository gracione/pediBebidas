import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Home from '../pages/Home';
import RegisterScreen from '../screens/RegisterScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {removeToken} from '../service/api';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Navbar from '../components/Navbar';
import Pedidos from '../pages/Pedidos';
import Perfil from '../pages/Perfil';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export const Navigation: React.FC<NavigationProps> = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const sairDoPerfil = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {/* {isLoggedIn && <Navbar navigation={navigation} sairDoPerfil={sairDoPerfil} />} */}
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Pedidos"
            component={Pedidos}
            options={{headerShown: false}}
          />
          <Tab.Screen name="Perfil" options={{headerShown: false}}>
            {props => <Perfil {...props} navigation={navigation} sairDoPerfil={sairDoPerfil} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
