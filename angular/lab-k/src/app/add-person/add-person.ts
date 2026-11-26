import { Component } from '@angular/core';
import { Person } from '../person';
import { PersonLs } from '../person-ls';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-person',
  imports: [FormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css',
})
export class AddPerson {
  person: Person = {
    address: {}
  }

  constructor(
    private personLsService: PersonLs,
    private router: Router
  ){}

  save(){
    this.personLsService.addPerson(this.person)
    this.router.navigate(['/list']);
  }

  ngOnInit(){

  }
}
