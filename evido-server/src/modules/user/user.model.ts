import model from '../../libs/model';

const Model = model('User', ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']);
export interface IUserFields {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser extends IUserFields {}

class User extends Model<IUser> implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(obj: IUserFields) {
    super(obj);
  }

  static readonly modelName = 'UserModel';
}

export default User;
