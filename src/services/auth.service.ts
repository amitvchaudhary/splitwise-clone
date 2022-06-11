import { SignupVM } from './../models/classes/auth.classes';
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

  userExist(email: string) {
    console.log(email);
    const user: User | undefined = userQuery.getEntity(email.trim());
    console.log(user);
    return (user && user?.password) ? true : false;
  }

  registerUser(signupVM: SignupVM) {
    const user = new User();
    user.emailId = signupVM.email.trim();
    user.name = signupVM.name.trim();
    user.password = signupVM.password.trim();

    userStore.upsert(user.emailId, user);
  }
}
export const authService = AuthService.getInstance();
