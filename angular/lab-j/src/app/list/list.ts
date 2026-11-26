import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  template: `
    <div id="frame">
      <div>
        <input type="text" [(ngModel)]="inputText">
        <button (click)="inputToArray()"> Dodaj </button>
      </div>
      <ul>
        @for(el of elements; track el; let i = $index){
          <li>
            {{el}}
            <a href="#" (click)="remove(i)"> usuń </a>
        }
      </ul>
    </div>
  `,
  styleUrl: './list.css',
})
export class List implements OnInit{
  elements: string[];
  inputText: string;

  constructor(){
    this.inputText = '';
    this.elements = [];
  }

  ngOnInit(): void {
  }

  inputToArray(): void{
    this.elements.push(this.inputText)
    this.inputText = '';
  }

  remove(index: number): void{
    this.elements.splice(index,1)
    console.log("remove " + index)
  }
}
