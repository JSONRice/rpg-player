import * as React from 'react';
import {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import Notification from './notification';

interface InputProps<TFields extends Record<string, any>> {
  name: keyof TFields extends string ? keyof TFields : never;
  label: string;
  type?: string;
  register: UseFormRegister<TFields>;
  errors?: FieldErrorsImpl<DeepRequired<TFields>>;
  placeholder?: string;
  validation?: RegisterOptions;
}

// A simple input component that uses the react-hook-form library to manage form state.
export default function Input<TFields extends Record<string, any>>({
  name,
  label,
  register,
  type = 'text',
  errors,
  placeholder,
  validation,
}: InputProps<TFields>) {
  const errorMsg = errors && (errors[name]?.message as unknown as string);
  const path = name as unknown as Path<TFields>;

  return (
    <div>
      <label
        className="block uppercase tracking-wide text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`appearance-none block w-full border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
          errorMsg ? 'border-red-500' : 'border-gray-200'
        } `}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(path, validation)}
      />
      {errorMsg && <Notification message={errorMsg} />}
    </div>
  );
}
