import { Component, OnInit } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { Hotel } from '../shared/models/hotels.model';
import { HotelsService } from '../shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[]  = []
  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.hotelsService.hotelsSubject.subscribe(hotels => {
      console.log("POTATOES", hotels)
      this.hotels = hotels
    })
  }

}
