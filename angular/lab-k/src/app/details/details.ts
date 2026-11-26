import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Person } from '../person';
import { PersonLs } from '../person-ls';

@Component({
  selector: 'app-details',
  imports: [RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  person?: Person;
  id?: number;
  constructor(
    private route: ActivatedRoute,
    private personLsService: PersonLs
    ){ }

    ngOnInit(){
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.person = this.personLsService.getPerson(this.id);
    }
}
