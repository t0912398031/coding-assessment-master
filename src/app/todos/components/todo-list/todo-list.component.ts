import { Component } from '@angular/core';
import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {

  todoList
  filteredTodoList
  subscription;
  inputText
  constructor (
    // private changeDetectorRef: ChangeDetectorRef,
    private todosService: TodosService,
  ) {}

  ngOnInit(): void {
    this.todosService.allTodos$.subscribe(todos => {
      this.todoList = todos
      
      // this.multipleTodosExist = todos && todos.length > 1;
      // this.changeDetectorRef.markForCheck();
    });
    this.todosService.filteredTodos$.subscribe(todos => {

      // this.filteredTodoList = todos
      this.filteredTodoList = todos.map(obj=> ({ ...obj, Editing: 'false' }))
      console.log(this.filteredTodoList)
    });
  }

  toggleCompleted(index, todo){
    this.todosService.toggleComplete(index)
  }

  removeTodo(i){
    this.todosService.removeTodo(i)
  }

  updateTodo(index, todo){
    let text = todo.text
    this.todosService.updateTodo(index, text)
    todo.isEdit = false
  }


  isEdit(t){
    t.isEdit = true 
  }
  
}
