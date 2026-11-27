import { Component } from '@angular/core';
import { TasksService } from '../../assets/tasks';
import { Task } from '../../assets/task';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { MatCardActions, MatCardSubtitle, MatCardHeader, MatCard } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerToggle, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-archive',
  imports: [MatButtonModule, MatIconModule,FormsModule,MatCheckboxModule,MatToolbarModule,MatFormField,MatLabel,MatInput,MatHint,MatButton,MatDatepicker,MatDatepickerToggle,MatNativeDateModule,MatInputModule,MatDatepickerModule,MatCardActions,DatePipe,MatCardSubtitle,MatCardHeader,MatCard],
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

