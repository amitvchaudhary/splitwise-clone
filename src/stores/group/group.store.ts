import { Group } from './../../models/classes/core.classes';
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface GroupState extends EntityState<Group, number> {}

@StoreConfig({ name: 'group' })
export class GroupStore extends EntityStore<GroupState> {
  constructor() {
    super();
  }
}

export const groupStore = new GroupStore();
