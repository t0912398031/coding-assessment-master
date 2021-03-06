import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { TodosService } from './todos/services/todos.service';
import { FormControl } from '@angular/forms';
import { ITodo } from './todos/interfaces';
import { FILTER_MODES } from './todos/constants/filter-modes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent { 

  todo: ITodo = {text: '', completed: false}
  todos
  filterMode?: FILTER_MODES;

  constructor (
    private todosService: TodosService,
  ) {
    
  }
  ngOnInit(): void {
    this.todosService.allTodos$.subscribe(todos => {
      this.todos = todos
      // console.log(todos)
    });
  }
  
  addTodo() {
    if(!this.todo.text) return
    this.todosService.addTodo(this.todo.text)
    this.todo.text = ''
  }
  all(){
    this.filterMode = 'All'
    this.todosService.changeFilterMode(this.filterMode)
  }
  active(){
    this.filterMode = 'Active'
    this.todosService.changeFilterMode(this.filterMode)
  }
  completed(){
    this.filterMode = 'Completed'
    this.todosService.changeFilterMode(this.filterMode)
  }
  clearCompleted(){
    this.todosService.clearCompleted()
  }

  editing = false
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == document.getElementById("inputfield")){
      this.editing = true
    } else{
      this.editing = false
      this.addTodo()
    }
  }
}
