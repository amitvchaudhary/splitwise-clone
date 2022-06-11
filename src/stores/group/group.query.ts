import { GroupState, groupStore, GroupStore } from './group.store';
import { QueryEntity } from "@datorama/akita";

export class GroupQuery extends QueryEntity<GroupState> {
    constructor(protected store: GroupStore) {
      super(store);
    }
  }
  
  export const groupQuery = new GroupQuery(groupStore);
  