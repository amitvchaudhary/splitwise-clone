import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { User } from "../../models/classes/core.classes";

export interface UserState extends EntityState<User, string> {}

@StoreConfig({ name: 'user', idKey: 'emailId' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super();
  }
}

export const userStore = new UserStore();
