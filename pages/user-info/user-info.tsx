import * as React from 'react';
import { useRouter } from 'next/router';

import {
  Dropdown,
  Form,
  Input,
  ImageUpload,
  Notification,
  UserInfoProps,
  Button,
} from '../../common';

const defaultValues = {
  email: null,
  firstName: null,
  lastName: null,
  password: null,
  confirmPassword: null,
  phone: null,
  address: null,
  addressTwo: null,
  city: null,
  state: null,
  zip: null,
};

export default function UserInfo({ data: { states }, userId }: UserInfoProps) {
  const router = useRouter();
  const [didSubmissionFail, setDidSubmissionFail] = React.useState<
    boolean | undefined
  >(undefined);

  async function handleSubmit(data: typeof defaultValues) {
    if (!userId) {
      setDidSubmissionFail(true);
      return;
    }

    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phone,
      address: data.address,
      addressTwo: data.addressTwo,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}users/personal-info/${userId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (response.status !== 200) {
      setDidSubmissionFail(true);
    } else {
      router.replace('/user-info/submit-success');
    }
  }

  function notify() {
    if (didSubmissionFail === undefined) {
      return null;
    }
    if (didSubmissionFail) {
      return (
        <div className="mt-6">
          <Notification message="Something went wrong. Please try again." />
        </div>
      );
    }
    return (
      <div className="mt-6">
        <Notification variant="success" message="User info submitted." />
      </div>
    );
  }

  return (
    <div className="flex justify-center align-center">
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        render={({ register, reset, getValues, formState: { errors } }) => {
          return (
            <>
              <h3>New Account</h3>
              <div className="divider" />
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="flex justify-center md:justify-start lg:justify-start w-full px-3 mb-6">
                  <ImageUpload />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Input
                    label="First Name"
                    register={register}
                    errors={errors}
                    name="firstName"
                    type="text"
                    placeholder="John"
                    validation={{ required: 'First name is required.' }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Input
                    label="Last Name"
                    register={register}
                    errors={errors}
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    validation={{ required: 'Last name is required.' }}
                  />
                </div>
              </div>
              <div className="mb-6">
                <Input
                  label="Email"
                  register={register}
                  errors={errors}
                  name="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  validation={{ required: 'Email is required.' }}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  validation={{ required: 'Password is required.' }}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  validation={{
                    required: 'Password is required.',
                    validate: value => {
                      if (value !== getValues('password')) {
                        return 'Passwords do not match.';
                      }
                    },
                  }}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Phone"
                  register={register}
                  errors={errors}
                  name="phone"
                  type="phone"
                  placeholder="123-456-7899"
                  validation={{ required: 'Phone number is required.' }}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Primary Address"
                  register={register}
                  errors={errors}
                  name="address"
                  type="text"
                  validation={{ required: 'Address is required.' }}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Secondary Address"
                  register={register}
                  name="addressTwo"
                  type="text"
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Input
                    label="City"
                    register={register}
                    errors={errors}
                    name="city"
                    type="text"
                    placeholder="Albuquerque"
                    validation={{ required: 'City is required.' }}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Dropdown
                    label="State"
                    items={states}
                    register={register}
                    name="state"
                    errors={errors}
                    validation={{
                      required: 'State selection is required.',
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Input
                    label="Zip Code"
                    register={register}
                    errors={errors}
                    name="zip"
                    type="text"
                    placeholder="84043"
                    validation={{ required: 'Zipcode is required.' }}
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-col mt-4 sm:flex-row-reverse">
                <div className="flex-1">
                  <Button label="Submit" type="submit" />
                </div>
                <div className="flex-1">
                  <Button
                    isOutline
                    label="Reset"
                    type="button"
                    onClick={() => reset()}
                  />
                </div>
              </div>
              {notify()}
            </>
          );
        }}
      />
    </div>
  );
}
