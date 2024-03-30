import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { removeToken } from "../service/api";
import { AuthProvider, AuthContext } from "../contexts/auth";
import { ADM } from "../service/types";
import { SimpleLineIcons, AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import Home from "../pages/Home";
import RegisterScreen from "../screens/RegisterScreen";
import Pedidos from "../pages/Pedidos";
import CadastrarProduto from "../pages/CadastrarProduto";
import Perfil from "../pages/Perfil";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authContext = useContext(AuthContext);

  const sairDoPerfil = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={tabScreenOptions("Home", SimpleLineIcons, "home")}
            />
            <Tab.Screen
              name="Pedidos"
              component={Pedidos}
              options={tabScreenOptions("Pedidos", Entypo, "drink")}
            />
            {authContext.tipoUser === ADM && (
              <Tab.Screen
                name="Cadastrar Produto"
                component={CadastrarProduto}
                options={tabScreenOptions("Cadastrar Produto", Octicons, "plus-circle")}
              />
            )}
            <Tab.Screen
              name="Perfil"
              options={tabScreenOptions("Perfil", AntDesign, "profile")}
            >
              {() => <Perfil sairDoPerfil={sairDoPerfil} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Cadastrar Usuario"
              component={RegisterScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};

const tabScreenOptions = (label: string, IconComponent: any, iconName:string) => ({
  tabBarLabel: label,
  tabBarIcon: ({ color, size }) => (
    <IconComponent name={iconName} size={size} color={color} />
  ),
});
