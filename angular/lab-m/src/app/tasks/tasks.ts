import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../assets/tasks';
import { Task } from '../../assets/task';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { MatButton, MatButtonModule } from '@angular/material/button';
 import {MatCheckboxModule} from '@angular/material/checkbox';
 import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle } from '@angular/material/card';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tasks',
  imports: [FormsModule,MatButtonModule,MatCheckboxModule,MatToolbarModule,MatFormField,MatLabel,MatInput,MatHint,MatButton,MatDatepicker,MatDatepickerToggle,MatNativeDateModule,MatInputModule,MatDatepickerModule,MatCardActions,DatePipe,MatCardSubtitle,MatCardHeader,MatCard],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit{
  tasks: Task[] = [];
  newTask: Task = {};
  isProcessing: boolean = false
  titleIsNotEmpty = false;
  canArchive = false;
  constructor(
    private tasksService: TasksService,
  ){
  }

  addTask(){
    if(this.newTask.title === undefined){
      return;
    }
    this.newTask.completed = false
    this.newTask.archived = false
    this.tasks.unshift(this.newTask);

    this.isProcessing = true
    this.tasksService.post(this.newTask).subscribe((task: Task) => {
      this.newTask = {};
      this.ngOnInit();
    })
    this.isProcessing = false
  }

  changeTitle(value : string){
    this.titleIsNotEmpty = value.trim().length > 0;
  }

  archiveCompleted(){
    const observables: Observable<any>[] = []
    for(const task of this.tasks){
      if(!task.completed){
        continue
      }
      
      task.archived = true;
      observables.push(this.tasksService.put(task));

      forkJoin(observables).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }
  handleChange(task: Task,completed: boolean){
    task.completed = completed
    this.tasksService.put(task).subscribe(()=>{
      this.ngOnInit()
    })
  }
  ngOnInit(): void {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
      this.canArchive = this.tasks.some(task => task.completed === true);
    });

  }
}
