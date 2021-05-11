import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/models/hotels.model';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel!: Hotel;
  currentImageIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousClicked() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  onNextClicked() {
    if (this.currentImageIndex < this.hotel.imgs.length - 1) {
      this.currentImageIndex++;
    }
  }

}
