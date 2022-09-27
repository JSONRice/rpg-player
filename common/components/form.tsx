import * as React from 'react';
import {
  FormProvider,
  Mode,
  useForm,
  UseFormReturn,
  DeepPartial,
  SubmitHandler,
} from 'react-hook-form';

interface FormProps<TFields extends Record<string, any>> {
  defaultValues: DeepPartial<TFields>;
  render: (formMethods: UseFormReturn<TFields>) => React.ReactElement;
  onSubmit: SubmitHandler<TFields>;
  validateOn?: Mode;
}

export default function Form<TFields extends Record<string, any>>({
  defaultValues,
  render,
  onSubmit,
  validateOn = 'onSubmit',
  ...props
}: FormProps<TFields>) {
  const methods = useForm({
    defaultValues,
    mode: validateOn,
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {render(methods)}
      </form>
    </FormProvider>
  );
}
