import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { firebaseContext } from '../context/firebaseContext';

const MotivosChatPicker = ({ onClose }) => {
  const { motivosChat } = useContext(firebaseContext);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View>
      <Text>Selecciona un motivo:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={motivosChat} // Usa los motivos obtenidos de tu contexto
        value={selectedValue}
      />
      <TouchableOpacity onPress={() => onClose(selectedValue)}>
        <Text>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MotivosChatPicker;
