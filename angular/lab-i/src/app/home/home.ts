import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousinglocationInfo } from '../housinglocation';
import { Housing } from '../housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)"> Search</button>
      </form>
    </section>
    <section class="results">
       <section class="results">
@for(housingLocation of filteredLocationList; track $index) {
  <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
}
      </section>
    </section>
  `,
  styleUrl: './home.css',
})
export class Home {
  housingLocationList: HousinglocationInfo[] = [];
  housingService: Housing = inject(Housing);
  filteredLocationList: HousinglocationInfo[] = [];

    filterResults(text: string) {
        if (!text) {
            this.filteredLocationList = this.housingLocationList;
            return;
        }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  constructor() {
  this.housingService
    .getAllHousingLocations()
    .then((housingLocationList: HousinglocationInfo[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
}
}