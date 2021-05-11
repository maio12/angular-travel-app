import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, takeLast, debounceTime } from 'rxjs/operators';
import { Hotel } from '../shared/models/hotels.model';
import { HotelsService } from '../shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {
  hotels: Hotel[]  = [];
  subscriptions: Subscription[] = [];

  constructor(private hotelsService: HotelsService) { } //fa l'iniezione nel constructor. risolve le dipendenze. non c e l'ho in providers, va su appmodule, poi piu in alto di tutto in root (perche c'e' decorator injectable forroot).
  //e' una singleton pattern con i private instances, senza instanziare con new! quindi valori che ottengo da ua parte le ottengo nell altra, 
  //si puo' fare altrimenti, con due diverse instanze.

  // training(): Observable<any> {
  //   return new Observable(sub => {
  //     setTimeout(() => sub.next('ciao1'), 100);
  //     setTimeout(() => sub.next('ciao2'), 200);
  //     setTimeout(() => sub.complete(), 150);
  //   })
  // }

  // training(): Observable<any> {
  //   return interval(100).pipe(
  //     take(3),
  //     map(res =>  `ciao${res + 1}`)
  //   )
  // }

  // training(): Observable<any> {
  //   const source = fromEvent(window, 'click');
  //   const example = source.pipe(switchMap(res =>  interval(1000))) //from event e interval sono 2 obs e devo prendere quello di dentro => switchmap. quindi per combineare 2 obs usare switchmap.
  //   return example
  //   }

  //1) we get just ciao1 because the complete is called before ciao2 is called.
  //if the setTimeout for the sub.complete was called after 250 we would get ciao1, ciao2.
  //2) no, it ends the subscription to the Observer
  //3) yes, it takes one "shout" from the Observable, will print ciao1 and stop the subscription

  ngOnInit(): void {
    const sub = this.hotelsService.hotelsSubject.subscribe(hotels => {
      this.hotels = hotels;
    });
    this.subscriptions.push(sub);
    // this.hotelsService.hotelsSubject.subscribe(hotels => {
    //   console.log("POTATOES", hotels)
    //   this.hotels = hotels
    // })
    //this.training().subscribe(res => console.log(res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
