import { UserState, userStore, UserStore } from './user.store';
import { Order, Query, QueryConfig, QueryEntity } from "@datorama/akita";

@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC
})
export class UserQuery extends QueryEntity<UserState> {
    constructor(protected store: UserStore) {
      super(store);
    }
  }
  
  export const userQuery = new UserQuery(userStore);
  