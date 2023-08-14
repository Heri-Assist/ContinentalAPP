import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export const EmergenciaScreen = () => {
    useEffect(() => {
        console.log('EmergenciaScreen');
    }, []);
    
    return (
        <View>
            <Text>Desde EmergenciaScreen</Text>
        </View>
    );
};
