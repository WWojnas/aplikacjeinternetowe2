import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../assets/tasks';
import { Task } from '../../assets/task';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit{
  tasks: Task[] = [];
  newTask: Task = {};
  isProcessing: boolean = false
  constructor(
    private tasksService: TasksService
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
    });
  }
}
