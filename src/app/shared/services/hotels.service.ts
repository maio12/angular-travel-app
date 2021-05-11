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
  hotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]); //domanda, un Subject e' un Observable che non solo posso ascoltare ma puo' anche comunicare. con il next(). behaviorsubject: un observable che emette l'ultimo valore, possiamo subscriverci a un subject pure.

  httpOptions = {
    headers: {
      'x-rapidapi-key': environment.rapidApiKey,
      'x-rapidapi-host': environment.rapidApiHost
    }
  };

  constructor(private http: HttpClient) { //http module, modulo interno di angular per requests. 
    //Differenza tra usare fetch e http module e' che ci ritorna un Observable direttamente, non e' neccesario il from promise.
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
        switchMap(res => { //switchmap, invece del map normale dentro il pipe, il switchmap, trasforma cio ce' e' dentro l'observable. switchMap: funziona che in entrata abbiamo entity[] e in uscita un Observable di hotels[].
        //fa un flat dell Observable in uscita praticamante, ritorna solo l'Hotel[], quello che ha dentro l'Observable in pratica
        //invece di restituire l'Observable, ti restituisce qualsiasi cosa che c'e' dentro.

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
          return forkJoin(requests); //forkjoin: apsetta che tutte finiscano e poi crea solo un observable per averere tutto l'array di risposte
          //quindi cosi' diventa un observable di Hotel array. forkJoin: vogliamo solo un Observable, non un array di observable (come promise all)
        }),
        map(res => res) //domanda
      );
  }
}