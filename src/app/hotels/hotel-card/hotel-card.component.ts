import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/models/hotels.model';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel!: Hotel;

  constructor() { }

  ngOnInit(): void {
  }

}
