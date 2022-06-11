export class UserService {
  private static instance: UserService;

  private constructor() {}

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  
}
export const userService = UserService.getInstance();
