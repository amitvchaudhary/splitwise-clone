import { Password } from 'primereact/password';
import { SignInVM, SignupVM } from './../models/classes/auth.classes';
import { userStore } from './../stores/user/user.store';
import { User } from "../models/classes/core.classes";
import { userQuery } from "./../stores/user/user.query";
export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  isUserRegistered(data: SignInVM) {
    const user: User | undefined = userQuery.getEntity(data.email.trim());

    if (user) {
      if (user.emailId === data.email.trim() && user.password === data.password.trim()) {
        return true;
      } else {
        return false;
      }
    }
  }

  userExist(email: string) {
    const user: User | undefined = userQuery.getEntity(email.trim());
    return (user && user?.password) ? true : false;
  }

  registerUser(signupVM: SignupVM) {
    let user: any = userQuery.getEntity(signupVM.email.trim());
   
    if (user) {
      user = JSON.parse(JSON.stringify(user));
      user.password = signupVM.password.trim();
      userStore.replace(user.emailId, user);
    } else {
      user = new User();
      user.emailId = signupVM.email.trim();
      user.name = signupVM.name.trim();
      user.password = signupVM.password.trim();
      userStore.add(user);
    }   
  }

  setLoggedInUser(email: string) {
    userStore.setActive(email);
  }

  isUserLoggedIn() {
    return userQuery.getActive() ? true : false;
  }

  getLoggedInUser() {
    return userQuery.getActive();
  }
}
export const authService = AuthService.getInstance();
