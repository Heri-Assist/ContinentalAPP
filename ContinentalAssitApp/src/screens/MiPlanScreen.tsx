import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export const MiPlanScreen = () => {
    useEffect(() => {
        console.log('MiPlanScreen');
    }, []);
    
    return (
        <View>
            <Text>Desde MiPlanScreen</Text>
        </View>
    );
};
