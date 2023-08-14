import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export const MiCuentaScreen = () => {
    useEffect(() => {
        console.log('MiCuentaScreen');
    }, []);
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Desde MiCuenta  </Text>
        </View>
    );
};
