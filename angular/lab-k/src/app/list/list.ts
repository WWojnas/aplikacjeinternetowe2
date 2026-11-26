import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Person } from '../person';
import { PersonLs } from '../person-ls';

@Component({
  selector: 'app-list',
  imports: [
    RouterLink
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  people!: Person[];

  constructor(
    private personLsService: PersonLs
  ) {}

  ngOnInit(){
    this.people = this.personLsService.getAll()
  }
 
  delete(index: number){
    if(confirm("are you sure?")){
      this.personLsService.deletePerson(index)
      this.people = this.personLsService.getAll()
    }
  }
}
