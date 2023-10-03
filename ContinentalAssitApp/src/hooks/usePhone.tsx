import React, { useState } from 'react';
import { ICountry, PhoneInput } from 'react-native-international-phone-number';
import { Controller, useForm } from 'react-hook-form';
import { Style } from '../theme/registroCSS';
import { Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'; // Importa Keyboard y TouchableOpacity
import { useTranslation } from 'react-i18next';
import { UsuarioRegistro, usuarioRegistro } from '../interfaces/usuarioRegistro';

interface PhoneProps {
  control: any;
  defaultValue?: string;
  onCountryChange?: (country: ICountry) => void;
}

export const usePhone = ({ control, defaultValue = '', onCountryChange }: PhoneProps) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  const handleDonePress = () => {
    Keyboard.dismiss(); // Oculta el teclado al presionar "Done"
  };

  return (
    <Controller
      name="telefono"
      control={control}
      rules={{
        required: t('registro.errorRequerido'),
        minLength: {
          value: 9,
          message: t('registro.errorMinimo'),
        },
        maxLength: {
          value: 13,
          message: t('registro.errorMaximo'),
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <React.Fragment>
          <PhoneInput
            containerStyle={Style.input}
            defaultValue={defaultValue}
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            placeholder='Ingresa tu número de teléfono'
            keyboardType="numeric" // Configura el teclado como numérico
            returnKeyType="done"
            onSubmitEditing={handleDonePress} // Maneja la presión de "Done"
          />
         
          {error && (
            <Text style={Style.errorText}>
              {error.message}
            </Text>
          )}
        </React.Fragment>
      )}
    />
  );
};
