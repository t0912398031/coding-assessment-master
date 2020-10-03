import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';
import { clone } from '../../lib/utils'

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      // const updatedTodos = [...existingState.todos];
      let updatedTodos = clone([...existingState.todos])
      updatedTodos.splice(index, 1, { text, completed: updatedTodos[index].completed });

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      let updatedTodos = clone([...existingState.todos])
      updatedTodos[index].completed = !updatedTodos[index].completed

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState, { }) => {
      let updatedTodos = clone([...existingState.todos])
      let boolean = updatedTodos.some((e)=> e.completed==false)
      if(boolean){
        updatedTodos.forEach((t)=>{t.completed = true
        })
      } else{
        updatedTodos.forEach((t)=>{t.completed = false
        })
      }
      

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
// export const filteredTodos = (state: ITodosState) => state.todos.filter(function(t){
//   // console.log(state.filterMode)
//   switch(state.filterMode){
//     case 'All':
//         return t
//         break;
//     case 'Active':
//         return !t.completed
//         break;
//     case 'Completed':
//     return t.completed
//     break;
//     default:
//         return t
//   }
// });


