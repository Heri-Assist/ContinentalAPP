
import React, { useState } from 'react';
import { ICountry, PhoneInput } from 'react-native-international-phone-number';
import { Controller } from 'react-hook-form';
import { Style } from '../theme/themeStyle';

interface PhoneProps {
  control: any;
  defaultValue?: string;
}

export const usePhone = ({ control, defaultValue = '' }: PhoneProps) => {
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  return (
    <Controller
    
      name="phoneNumber"
      control={control}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          containerStyle={Style.input}
          defaultValue={defaultValue}
          value={value}
          onChangePhoneNumber={onChange}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          placeholder='Ingresa tu número de teléfono'
        />
      )}
    />
  );
};