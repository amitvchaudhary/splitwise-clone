import { GroupState, groupStore, GroupStore } from './group.store';
import { Order, QueryConfig, QueryEntity } from "@datorama/akita";

@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC
})
export class GroupQuery extends QueryEntity<GroupState> {
    constructor(protected store: GroupStore) {
      super(store);
    }
  }
  
  export const groupQuery = new GroupQuery(groupStore);
  