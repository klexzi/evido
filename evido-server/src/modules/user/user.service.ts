import { UserModel, IUserFields } from '.';

class UserService {
  User: typeof UserModel;
  constructor(User: typeof UserModel) {
    this.User = User;
  }

  static readonly serviceName = 'UserService';

  async findAll() {
    return this.User.findAll();
  }

  async createUser(obj: IUserFields) {
    const user = new UserModel(obj);
  }
}

export default UserService;
