import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Entity, Hotel, HotelsApiResponse } from '../models/hotels.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  getTestData(): Observable<Hotel[]> {
    const promise = fetch('https://hotels4.p.rapidapi.com/locations/search?query=new%20york&locale=en_US', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': environment.rapidApiKey,
        'x-rapidapi-host': environment.rapidApiHost
      }
    }).then(res => res.json()) as Promise<HotelsApiResponse>;

    const observable = from(promise)
      .pipe(
        map(res => {

        const hotelsEntities: Entity[] = [];

        res.suggestions.forEach(suggestion => {
          if (suggestion.group === 'HOTEL_GROUP') {
            hotelsEntities.push(...suggestion.entities);
          }
        });

        return hotelsEntities;
      }),

      map(res => {
        const hotels: Hotel[] = res.map(entity => ({
          name: entity.name,
          latitude: entity.latitude,
          longitude: entity.longitude,
          caption: entity.caption
        }));

        return hotels;
      })
      );

    return observable;
  }
}
