import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Random } from './random/random';
import { List } from './list/list';
@Component({
  selector: 'app-root',
  imports: [Random,List],
  template: `
    <section>
      <h1> {{ title() }}</h1>
      <app-random [max]="10"></app-random>
      <app-random [max]="100"></app-random>
      <app-list></app-list>
    </section>
`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lab J Natan Wojnas');
}
