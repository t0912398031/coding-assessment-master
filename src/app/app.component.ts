import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosService } from './todos/services/todos.service';
import { FormControl } from '@angular/forms';
import { ITodo } from './todos/interfaces';
// import { runInThisContext } from 'vm';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent { 
  textfield = 'Hello'
  todo: ITodo = {text: '', completed: false}
  todos
  filteredts
  constructor (
    private todosService: TodosService,
  ) {
    
  }
  ngOnInit(): void {
    this.todosService.allTodos$.subscribe(todos => {
      this.todos = todos
      // console.log(todos)

    });
    this.todosService.filteredTodos$.subscribe(t=>{
      this.filteredts = t 
      // console.log(this.filteredts)
    }
    )



  }
  
  addTodo(event) {
    this.todosService.addTodo(this.todo.text)
    this.todo.text = ''
  }
  all(){
    this.todosService.changeFilterMode('All')
  }
  active(){
    this.todosService.changeFilterMode('Active')
  }
  completed(){
    this.todosService.changeFilterMode('Completed')
    // console.log(this.filteredts)
  }
  clearCompleted(){
    this.todosService.clearCompleted()
  }

}
