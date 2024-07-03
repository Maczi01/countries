import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, tap, throwError} from 'rxjs';
import { Country } from '../types/Country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  // private dataSource = new BehaviorSubject<Country[]>([]);
  private http = inject(HttpClient);

  fetchCountries() {
    return this.http.get<Country[]>(`${this.baseUrl}/all`)
  }

  // getCountries(filter?: string, input?: string): void {
  //   let url = `${this.baseUrl}/all`;
  //
  //   if (input && input.length >= 3) {
  //     if (!filter || filter === 'country') {
  //       url = `${this.baseUrl}/name/${input}`;
  //     } else {
  //       url = `${this.baseUrl}/${filter}/${input}`;
  //     }
  //   }
  //
  //   this.http
  //     .get<Country[]>(url)
  //     .pipe(catchError(this.handleError))
  //     .subscribe(data => this.countriesSubject.next(data));
  // }

  // getRandomCountry(): Observable<Country[]> {
  //   return this.http.get<Country[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('Countries not found'));
    }
    return throwError(() => new Error('An error occurred'));
  }
}
