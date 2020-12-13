import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/shared/models/hotels.model';
import { HotelsService } from 'src/shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: []
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.hotelsService.getTestData().subscribe(res => this.hotels = res);
  }
}
