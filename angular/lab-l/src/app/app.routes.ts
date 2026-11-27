import { Routes } from '@angular/router';
import { Tasks } from './tasks/tasks';
import { Archive } from './archive/archive';

export const routes: Routes = [
    {path: 'archive', component: Archive},
    {path: 'tasks', component: Tasks},
    {path: '', redirectTo: '/tasks', pathMatch: 'full'},    
];