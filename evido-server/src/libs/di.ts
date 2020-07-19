import serviceLocator from './serviceLocator';

import { UserModel, UserService } from '../modules/user';

serviceLocator.register(UserModel.modelName, () => UserModel);

serviceLocator.register(UserService.serviceName, () => {
  const UserModelDI = serviceLocator.get<typeof UserModel>(UserModel.modelName);
  return new UserService(UserModelDI);
});

export default serviceLocator;
