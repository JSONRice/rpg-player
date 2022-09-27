import SelectItem from './select-item.type';
import User from './user.type';

export default interface UserInfoProps {
  userId?: string | string[] | undefined;
  data: {
    states: SelectItem[];
    users: User[];
  };
}
