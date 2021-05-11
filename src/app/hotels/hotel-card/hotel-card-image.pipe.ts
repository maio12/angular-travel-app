import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from 'src/app/shared/models/hotels.model';

@Pipe({
  name: 'hotelCardImage'
})
export class HotelCardImagePipe implements PipeTransform {

  transform(value: Hotel, index: number): string {
    console.log(value)
    return value.imgs[index].replace('{size}', 'b');
  }

}
