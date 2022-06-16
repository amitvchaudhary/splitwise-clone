import { Query } from '@datorama/akita';
import { GlobalState } from './global.model';
import { GlobalStore, globalStore } from './global.store';

export class GlobalQuery extends Query<GlobalState> {

  constructor(protected store: GlobalStore) {
    super(store);
  }

}

export const globalQuery = new GlobalQuery(globalStore);
