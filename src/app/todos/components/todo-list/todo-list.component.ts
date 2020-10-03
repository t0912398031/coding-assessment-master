import { Component } from '@angular/core';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {
  todos
  filteredTodoList
  size = false;
  filterMode?: FILTER_MODES = 'All'

  constructor (
    private todosService: TodosService,
  ) {}

  filterTodos(t) {
    switch(this.filterMode){
      case 'All':
          return t
          break;
      case 'Active':
          return !t.completed
          break;
      case 'Completed':
          return t.completed
          break;
      default:
          return t
    }
  }
  ngOnInit(): void {
    this.todosService.allTodos$.subscribe(todos => {
      let count = 0
      this.todos = todos.map(obj=> ({ ...obj, Editing: 'false', index: count++ }))
      // console.log(this.todos)

      this.filteredTodoList = this.todos.filter(t=>this.filterTodos(t))

    });

    this.todosService.filterMode$.subscribe(mode => {
      this.filterMode = mode
      // console.log(this.filterMode)
      this.filteredTodoList = this.todos.filter(t=>this.filterTodos(t))
    });

  }

  toggleCompleted(index, todo){
    this.todosService.toggleComplete(index)
  }

  removeTodo(todo){
    this.todosService.removeTodo(todo.index)
  }

  updateTodo(todo){
    let text = todo.text
    this.todosService.updateTodo(todo.index, text)
    todo.editing = false
  }


  isEdit(t){
    t.editing = true 
  }
  
}
