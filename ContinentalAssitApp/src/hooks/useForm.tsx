import React from 'react';
import { useState } from 'react';

type FieldValues<T> = {
  [key in keyof T]: string | Date;
};

export const useForm = <T extends Record<string, any>>(initState: T) => {
  const [state, setState] = useState<FieldValues<T>>(initState);

  const onChange = (value: string | Date, field: keyof T) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};

