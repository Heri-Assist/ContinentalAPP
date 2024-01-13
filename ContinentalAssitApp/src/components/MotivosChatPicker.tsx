import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { firebaseContext } from '../context/firebaseContext';

type MotivosChatPickerProps = {
  onClose: (value: string) => void;
};

const MotivosChatPicker: React.FC<MotivosChatPickerProps> = ({ onClose }) => {
  const { motivosChat } = useContext(firebaseContext);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        // @ts-ignore
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
