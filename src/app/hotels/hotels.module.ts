import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelCardImagePipe } from './hotel-card/hotel-card-image.pipe';


@NgModule({
  declarations: [
    HotelsComponent, 
    HotelCardComponent, 
    HotelCardImagePipe
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule
  ]
})
export class HotelsModule { }
