import { Component, input, Input } from '@angular/core';
@Component({
  selector: 'app-random',
  imports: [],
  template: `
    <div>
      <div id="frame">
        <h1> Random component ( max = {{ max() }})</h1>
        <span> {{ myNumber }} </span>
        <button (click)="btnCLick()"> Losuj </button>
          @if (isSmallerThanHalf()){
            <span [class.green]="isSmallerThanHalf()"> dolna połowa wartości </span>
          }
          @if (!isSmallerThanHalf()){
            <span [class.red]="!isSmallerThanHalf()"> górna połowa wartości </span>
          }
      </div>
    </div>
  `,
  styleUrl: './random.css',
})
export class Random {
  
  myNumber !: number;

  readonly max = input<number>(0);
  
  btnCLick(){
    this.myNumber = this.randomNumber(this.max())
  }

  isSmallerThanHalf(): boolean{
    return this.myNumber <= this.max() / 2
  }

  
  randomNumber(max: number): number {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
  }
}
