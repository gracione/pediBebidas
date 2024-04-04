import React, { useState } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FazerPedido } from "./FazerPedido";
import { Estabelecimentos } from "./Estabelecimentos";

const Stack = createNativeStackNavigator();

const Home: React.FC = () => {
  const [idEstabelecimento, setIdEstabelecimento] = useState<number>(0);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => (
            <Estabelecimentos
              {...props}
              setIdEstabelecimento={setIdEstabelecimento}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FazerPedido">
          {(props) => (
            <FazerPedido {...props} idEstabelecimento={idEstabelecimento} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

export default Home;
