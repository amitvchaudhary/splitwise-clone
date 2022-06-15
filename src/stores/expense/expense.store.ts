import { Expense } from './../../models/classes/core.classes';
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface ExpenseState extends EntityState<Expense, string> {}

@StoreConfig({ name: 'expense' })
export class ExpenseStore extends EntityStore<ExpenseState> {
  constructor() {
    super();
  }
}

export const expenseStore = new ExpenseStore();
