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

  filteredTodoList
  subscription;
  inputText
  size = false;

  constructor (
    private todosService: TodosService,
  ) {}

  ngOnInit(): void {

    this.todosService.filteredTodos$.subscribe(todos => {

      this.filteredTodoList = todos.map(obj=> ({ ...obj, Editing: 'false' }))

      console.log(this.filteredTodoList.length)
      console.log(this.size)
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
