import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Entity, Hotel, ImagesResponse, SuggestionsResposne } from '../models/hotels.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  hotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);

  httpOptions = {
    headers: {
      'x-rapidapi-key': environment.rapidApiKey,
      'x-rapidapi-host': environment.rapidApiHost
    }
  };

  constructor(private http: HttpClient) {
    this.hotelsSubject.subscribe(res => console.log(res));
    // TODO: CREATE A RESOLVER TO GET TEST DATA
    const localTestData = localStorage.getItem('test');
    if (localTestData) {
      const hotels = JSON.parse(localTestData);
      this.hotelsSubject.next(hotels);
    } else {
      this.getTestData().subscribe(hotels => {
        const hotelsData = JSON.stringify(hotels);
        localStorage.setItem('test', hotelsData);
        this.hotelsSubject.next(hotels);
      });
    }
  }

  getTestData() {
    return this.http.get<SuggestionsResposne>(
      `https://${environment.rapidApiHost}/suggest/v1.7/json?query=San%20Francisco&locale=en_US`, this.httpOptions)
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
        switchMap(res => {

          const requests = res.map((entity, index) => {

            const delayedResponse = new Observable(sub => sub.next()).pipe(
              delay(1500 * (index + 1)),
              take(1),
              switchMap(() => {
                return this.http.get<ImagesResponse>(
                  `https://${environment.rapidApiHost}/nice/image-catalog/v2/hotels/${entity.destinationId}`,
                  this.httpOptions
                ).pipe(
                  map(img => ({
                    name: entity.name,
                    lat: entity.latitude,
                    lng: entity.longitude,
                    imgs: img.hotelImages.map(imgs => imgs.baseUrl)
                  } as Hotel))
                );
              }),
            );
            return delayedResponse;
          });
          return forkJoin(requests);
        }),
        map(res => res)
      );
  }
}
