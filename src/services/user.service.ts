import { groupStore } from './../stores/group/group.store';
import { userStore } from './../stores/user/user.store';
import { AddFriendVM, AddGroupVM } from './../models/classes/user.classes';
import { authService, AuthService } from './auth.service';
import { Group, User } from '../models/classes/core.classes';
import { userQuery } from './../stores/user/user.query';
import { groupQuery } from '../stores/group/group.query';
import { ID } from '@datorama/akita';
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

  getAllUsers() {
    const loggedInUser: any = this._authService.getLoggedInUser();
    return userQuery.getAll({
      filterBy: [
        (entity) => entity.addedByEmailId === loggedInUser?.emailId
      ]
    });
  }

  getUser(id: any) {
    const users = this.getAllUsers();
    const user = users.find((user: User) => user.id === id);
    return user;
  }

  getAllGroups() {
    const loggedInUser: any = this._authService.getLoggedInUser();
    return groupQuery.getAll({
      filterBy: [
        (entity) => entity.addedByEmailId === loggedInUser?.emailId
      ]
    });
  }

  getGroup(id: any) {
    const groups = this.getAllGroups();
    const group = groups.find((group: Group) => group.id === id);
    return group;
  }

  selectAllUsers() {
    const loggedInUser: any = this._authService.getLoggedInUser();
    return userQuery.selectAll({
      filterBy: [
        (entity) => entity.addedByEmailId === loggedInUser?.emailId
      ]
    });
  }

  selectAllGroups() {
    const loggedInUser: any = this._authService.getLoggedInUser();
    return groupQuery.selectAll({
      filterBy: [
        (entity) => entity.addedByEmailId === loggedInUser?.emailId
      ]
    });
  }

  addUser(data: AddFriendVM): User {
    const loggedInUser: any = this._authService.getLoggedInUser();
    const user = new User();
    user.name = data.name;
    user.emailId = data.email;
    user.addedByEmailId = loggedInUser.emailId;
    userStore.add(user);
    return user;
  }

  addGroup(data: AddGroupVM) {
    const loggedInUser: any = this._authService.getLoggedInUser();
    const group = new Group();
    group.name = data.name;
    group.addedByEmailId = loggedInUser.emailId;
    group.users = data.users;
    groupStore.add(group);
  }

  getAllUsersAndGroups() {
    const users = this.getAllUsers();
    const groups = this.getAllGroups();

    return [...users, ...groups];
  }

  userExist(friend: AddFriendVM) {
    const users = this.getAllUsers();
    if (users && friend && friend.email) {
      return users.findIndex((user: User) => user.emailId === friend.email.trim()) >= 0;
    }
  }

  groupExist(group: AddGroupVM) {
    const groups = this.getAllGroups();
    if (groups && group && group.name.trim()) {
      return groups.findIndex((groupLocal: Group) => groupLocal.name.trim().toLowerCase() === group.name.trim().toLowerCase()) >= 0;
    }
  }
}
export const userService = UserService.getInstance();
