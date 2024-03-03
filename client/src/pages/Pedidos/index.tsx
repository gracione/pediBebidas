import React from 'react';
import {View, Text} from 'react-native';

const Pedidos: React.FC= () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Pedidos</Text>
      </View>
    </View>
  );
};

export default Pedidos;
