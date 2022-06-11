import { userStore } from './../stores/user/user.store';
import { AddFriendVM } from './../models/classes/user.classes';
import { authService, AuthService } from './auth.service';
import { User } from '../models/classes/core.classes';
import { userQuery } from './../stores/user/user.query';
export class UserService {
  private static instance: UserService;
  private _authService: AuthService;

  private constructor() {
    this._authService = authService;
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  selectAllUsers() {
    const loggedInUser: any = this._authService.getLoggedInUser();
    return userQuery.selectAll({
      filterBy: [
        (entity) => entity.addedByEmailId === loggedInUser?.emailId
      ]
    });
  }

  addUser(data: AddFriendVM) {
    const loggedInUser: any = this._authService.getLoggedInUser();
    const user = new User();
    user.name = data.name;
    user.emailId = data.email;
    user.addedByEmailId = loggedInUser.emailId;
    userStore.add(user);
  }
}
export const userService = UserService.getInstance();
