import { Component, OnInit } from '@angular/core';
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

  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.hotelsService.hotelsSubject.subscribe(hotels => this.hotels = hotels)
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
}
