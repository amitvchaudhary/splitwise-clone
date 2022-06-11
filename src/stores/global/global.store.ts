import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState, GlobalState } from './global.model';


@StoreConfig({ name: 'global', resettable: true })
export class GlobalStore extends Store<GlobalState> {

  constructor() {
    super(createInitialState());
    console.log('global cons---');
  }
}

export const globalStore = new GlobalStore();
