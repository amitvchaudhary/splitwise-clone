import { QueryEntity } from "@datorama/akita";
import { ExpenseState, expenseStore, ExpenseStore } from './expense.store';

export class ExpenseQuery extends QueryEntity<ExpenseState> {
    constructor(protected store: ExpenseStore) {
      super(store);
    }
  }
  
  export const expenseQuery = new ExpenseQuery(expenseStore);
  