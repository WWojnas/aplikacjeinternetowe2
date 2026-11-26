import { Injectable } from '@angular/core';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonLs {
  readonly KEY = 'stored-people-data';
  constructor() { }

  public getAll(): Person[] {
    const raw = localStorage.getItem(this.KEY)
    return raw ? JSON.parse(raw) : []
  }
  
  public getPerson(index: number): Person {
    return this.getAll()[index]
  }
  
  public addPerson(person: Person): void {
    const people = this.getAll()
    people.push(person)
    localStorage.setItem(this.KEY,JSON.stringify(people))
  }
  
  public deletePerson(index: number): void {
    const people = this.getAll()
    people.splice(index)
    localStorage.setItem(this.KEY,JSON.stringify(people))
  }
}