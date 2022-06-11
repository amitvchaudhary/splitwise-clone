import { UserState, userStore, UserStore } from './user.store';
import { Query, QueryEntity } from "@datorama/akita";

export class UserQuery extends QueryEntity<UserState> {
    constructor(protected store: UserStore) {
      super(store);
    }
  }
  
  export const userQuery = new UserQuery(userStore);
  