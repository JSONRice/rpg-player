import * as React from 'react';
import { useRouter } from 'next/router';

import {
  Dropdown,
  Notification,
  Form,
  Input,
  SelectItem,
  Button,
} from '../../common';

export interface RecruitProps {
  data: {
    paygroups: SelectItem[];
    roles: SelectItem[];
    ranks: SelectItem[];
    managers: SelectItem[];
    recruiters: SelectItem[];
  };
}

const defaultValues = {
  email: null,
  roleId: null,
  maritalStatusId: null,
  managerId: null,
  recruiterId: null,
  rankId: null,
  office: null,
  region: null,
  team: null,
};

// TODO: fetch from the server
const maritalStatusTypes: SelectItem[] = [
  { id: 1, name: 'Single' },
  { id: 2, name: 'Married' },
];

// TODO: fetch from the server
const officeTypes: SelectItem[] = [
  { id: 1, name: 'Orlando' },
  { id: 2, name: 'Tampa' },
  { id: 3, name: 'Fresno' },
  { id: 4, name: 'Dallas' },
];

// TODO: fetch from the server
const regionTypes: SelectItem[] = [
  { id: 1, name: 'Florida' },
  { id: 2, name: 'Texas' },
  { id: 3, name: 'California' },
];

// TODO: fetch from the server
const teamTypes: SelectItem[] = [
  { id: 1, name: 'Orlando - East' },
  { id: 2, name: 'Orlando - West' },
  { id: 3, name: 'Dallas - North' },
  { id: 4, name: 'Dallas - South' },
];

export default function Recruit({
  data: { roles, ranks, managers, recruiters, paygroups },
}: RecruitProps) {
  const router = useRouter();
  const [paygroupsChecked, setPaygroupsChecked] = React.useState<Array<string>>(
    [],
  );

  // TODO: This is a perfect use case for useFieldArray.
  // Add/Remove checked item from list
  function paygroupCheckedOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    let updatedList: string[] = [...paygroupsChecked];
    if (e.target.checked) {
      updatedList = [...paygroupsChecked, e.target.value];
    } else {
      updatedList.splice(paygroupsChecked.indexOf(e.target.value), 1);
    }
    setPaygroupsChecked(updatedList);
  }

  const [didSubmissionFail, setDidSubmissionFail] = React.useState<
    boolean | undefined
  >(undefined);

  async function handleSubmit(data: typeof defaultValues) {
    // remove uknown props for now since they are not in the database
    const payload = {
      email: data.email,
      managerId: data.managerId,
      recruiterId: data.recruiterId,
      geographyId: null,
      rankId: data.rankId,
      roleId: data.roleId,
      // where do we get the rest of the data?
      user_course: [],
      user_payGroup: [],
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      setDidSubmissionFail(true);
    } else {
      router.back();
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
        <Notification
          variant="success"
          message="Invitation sent successfully."
        />
      </div>
    );
  }

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      render={({ register, formState: { errors } }) => {
        return (
          <>
            <h3>New Recruit Invitation</h3>
            <div className="divider" />
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
              <Dropdown
                label="Role"
                items={roles}
                register={register}
                name="roleId"
                errors={errors}
                validation={{ required: 'Work Level is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Marital Status"
                items={maritalStatusTypes}
                register={register}
                name="maritalStatusId"
                errors={errors}
                validation={{ required: 'Marital status is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Manager"
                items={managers}
                register={register}
                name="managerId"
                errors={errors}
                validation={{ required: 'Manager is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Recruiter"
                items={recruiters}
                register={register}
                name="recruiterId"
                errors={errors}
                validation={{ required: 'Recruiter is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Office"
                items={officeTypes}
                register={register}
                name="office"
                errors={errors}
                validation={{ required: 'Office is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Region"
                items={regionTypes}
                register={register}
                name="region"
                errors={errors}
                validation={{ required: 'Region is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Ranks"
                items={ranks}
                register={register}
                name="rankId"
                errors={errors}
                validation={{ required: 'Rank is required.' }}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                label="Team"
                items={teamTypes}
                register={register}
                name="team"
                errors={errors}
                validation={{ required: 'Team is required.' }}
              />
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-3 pt-0">
              {paygroups ? (
                paygroups?.map(({ name }, index: number) => {
                  return (
                    <div className="form-control" key={`paygroup=${index}`}>
                      <label className="label cursor-pointer bg-slate-300 rounded p-3">
                        <span className="label-text pr-4">{name}</span>
                        <input
                          id="grid-paygroups"
                          type="checkbox"
                          className="checkbox-sm"
                          value={name}
                          onChange={paygroupCheckedOnChange}
                        />
                      </label>
                    </div>
                  );
                })
              ) : (
                <h3>Loading paygroups</h3>
              )}
            </div>
            <div className="flex gap-2 flex-col mt-4 sm:flex-row-reverse">
              <div className="flex-1">
                <Button label="Send Invitation" type="submit" />
              </div>
              <div className="flex-1">
                <Button
                  isOutline
                  label="Cancel"
                  type="button"
                  onClick={() => router.back()}
                />
              </div>
            </div>
            {notify()}
          </>
        );
      }}
    />
  );
}
