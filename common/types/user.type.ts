export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressTwo?: string;
  city: string;
  state: string;
  zip: string;
  status: 'ACTIVE' | 'PENDING';
  activeDate?: Date;
  createdDate?: Date;
  tshirtSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  managerId: number | null;
  geographyId: number | null;
  rankId: number;
  managerRel: number | null;
  recruiterRel: number | null;
  rank?: {
    id: number;
    name: string;
    description: string | null;
  };
  geography: number | null;
  user_course: Array<{ userId: number; courseId: number }>;
  user_payGroup: Array<{ userId: number; payGroupId: number }>;
}
