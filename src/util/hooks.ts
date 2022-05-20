import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * @todo Add correct return type + return field as well
 * @param validator callbackfn that determines if the string value complies with validation rules
 * @param errorMessage an error message to display below the HTML field
 * @returns Error that helps with conditional rendering and a function to apply to onChange
 */
export const useFieldWithValidation = (
  validator: (value: string) => boolean | RegExpMatchArray | null,
  errorMessage: string
): any => {
  const [field, setField] = useState<string>();
  const [error, setError] = useState<string>('');

  const validateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setError('');
    if (validator?.(value)) {
      setError(errorMessage);
    }
  };
  return [field, error, validateField];
};

export const useFetch = () => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<any>();
};
