import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');
// export const filteredTodosSelector = createFeatureSelector<todosState.ITodosState>('filteredTodos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

// export const filtered = createSelector(
//   todosSelector,
//   todosState.todos,
// );

export const filtered = createSelector(
  todosSelector,
  todosState.filteredTodos,
);
