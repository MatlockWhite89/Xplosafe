import { Pipe, PipeTransform } from '@angular/core';
import { LocationResponseData } from '../database/Models/database.model.location';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({ name: 'locationConverter' })
export class LocationConverterPipe implements PipeTransform {
  private static locationCache: Map<number, string> = new Map<number, string>();

  constructor(private httpClient: HttpClient) {
    if (LocationConverterPipe.locationCache.size < 1) {
      this.getLocations().subscribe((mappedLocations) => {
        for (const location of mappedLocations) {
          const id = location[0];
          const { base, city, state } = location[1];
          LocationConverterPipe.locationCache.set(
            id,
            base + ' - ' + city + ', ' + state
          );
        }
      });
    }
  }

  transform(value: number | any): string {
    if (!value) {
      return '';
    }

    if (LocationConverterPipe.locationCache.has(value)) {
      return LocationConverterPipe.locationCache.get(value);
    } else {
      return value.toString();
    }
  }

  private getLocations(): Observable<any[]> {
    const locations$: Observable<any> = this.httpClient.get(
      `${environment.apiUrl}/locations`
    );

    return locations$.pipe(
      map((val: LocationResponseData[]) =>
        val.map((singleValue) => [singleValue.id, singleValue])
      )
    );
  }
}
