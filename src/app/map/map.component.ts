import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Hotel } from 'src/app/shared/models/hotels.model';
import { HotelsService } from 'src/app/shared/services/hotels.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: []
})
export class MapComponent implements OnInit {
  latitude = 0;
  logitude = 0;
  hotels: Hotel[] = [];
  subscriptions: Subscription[] = []; //domanda, pattern di pushare le sub in array Subscriptions

  constructor(private hotelsService: HotelsService) { }  //fa l'iniezione nel constructor. risolve le dipendenze. non c e l'ho in providers, va su appmodule, poi piu in alto di tutto in root (perche c'e' decorator injectable forroot).
  //e' una singleton pattern con i private instances, senza instanziare con new! quindi valori che ottengo da ua parte le ottengo nell altra, 
  //si puo' fare altrimenti, con due diverse instanze.

  ngOnInit(): void {
    const sub = this.hotelsService.hotelsSubject.subscribe(hotels => this.setupMap(hotels))
    this.subscriptions.push(sub);
  }

  setupMap(hotels: Hotel[]): void {
    this.hotels = hotels;

    let totalLat = 0;
    let totalLng = 0;
    hotels.forEach(hotel => {
      totalLat += hotel.lat;
      totalLng += hotel.lng;
    });

    this.latitude = totalLat / hotels.length;
    this.logitude = totalLng / hotels.length;
  }

  onMapReady() {
    interval(50).pipe(
      map(() => document.querySelector<HTMLButtonElement>(".dismissButton")),
      filter((button) => button !== null),
      take(1)
    ).subscribe((dismissButton) => {
      dismissButton!.click();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
