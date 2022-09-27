import * as React from 'react';
import {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { SelectItem } from '..';
import Notification from './notification';

interface DropdownProps<TFields extends Record<string, any>> {
  errors?: FieldErrorsImpl<DeepRequired<TFields>>;
  name: keyof TFields extends string ? keyof TFields : never;
  items: SelectItem[];
  label?: string;
  register: UseFormRegister<TFields>;
  validation?: RegisterOptions;
}

export default function Dropdown<TFields extends Record<string, any>>({
  errors,
  name,
  items = [],
  label,
  register,
  validation,
}: DropdownProps<TFields>) {
  const errorMsg = errors && (errors[name]?.message as unknown as string);
  const path = name as unknown as Path<TFields>;

  return (
    <>
      {label && (
        <label
          className="block uppercase tracking-wide text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`focus:outline-none block appearance-none w-full border-2 py-3 px-4 pr-8 rounded leading-tight mb-3 ${
            errorMsg ? 'border-red-500' : 'border-gray-200'
          }`}
          {...register(path, validation)}
        >
          <option value=""></option>
          {items.map(({ id, name }) => {
            return (
              <option key={`dropdown-${name}-${id}`} value={id}>
                {name}
              </option>
            );
          })}
        </select>
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${
            errorMsg ? 'mb-6' : ''
          }`}
        >
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
        {errorMsg && <Notification message={errorMsg} />}
      </div>
    </>
  );
}
