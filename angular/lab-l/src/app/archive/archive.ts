import { Component } from '@angular/core';
import { TasksService } from '../../assets/tasks';
import { Task } from '../../assets/task';

@Component({
  selector: 'app-archive',
  imports: [],
  templateUrl: './archive.html',
  styleUrl: './archive.css',
})
export class Archive {
  tasks: Task[] = [];
  constructor(
    private tasksService: TasksService
  ){}
  deleteTask(task: Task){
    this.tasksService.delete(task).subscribe( ()=>{
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.tasksService.index(true).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}

