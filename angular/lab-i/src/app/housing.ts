import { Injectable } from '@angular/core';
import { HousinglocationInfo } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class Housing {
    readonly Url = 'http://localhost:8000/locations';



async getAllHousingLocations(): Promise<HousinglocationInfo[]> {
  const data = await fetch(this.Url);
  return (await data.json()) ?? [];
}

async getHousingLocationById(id: number): Promise<HousinglocationInfo | undefined> {
  const data = await fetch(this.Url);
  const locationJson = await data.json();
  const filteredJson = locationJson.find((entry: HousinglocationInfo) => entry.id == id) ?? undefined;
  return filteredJson ?? {};
}

  }
