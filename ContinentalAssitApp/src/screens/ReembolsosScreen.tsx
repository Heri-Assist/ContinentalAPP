import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export const ReembolsosScreen = () => {
    useEffect(() => {
        console.log('ReembolsosScreen');
    }, []);
    
    return (
        <View>
            <Text>Desde ReembolsosScreen</Text>
        </View>
    );
};
