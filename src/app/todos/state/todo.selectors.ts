import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');
// export const filterModeSelector = createFeatureSelector<todosState.ITodosState>('filterMode');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const mode = createSelector(
  todosSelector,
  todosState.filterMode
);

// export const filtered = createSelector(
//   todosSelector,
//   todosState.filteredTodos,
// );
