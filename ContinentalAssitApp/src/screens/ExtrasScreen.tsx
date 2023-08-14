import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export const ExtrasScreen = () => {
    useEffect(() => {
        console.log('ExtrasScreen');
    }, []);
    
    return (
        <View>
            <Text>Desde ExtrasScreen</Text>
        </View>
    );
};
