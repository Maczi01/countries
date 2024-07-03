import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import { Country } from '../types/Country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private countriesSubject = new BehaviorSubject<Country[]>([]);
  // countries$ = this.countriesSubject.asObservable();

  fetchCountries(input?: string, filter?: string): Observable<Country[]> {
    let url = `${this.baseUrl}/all`;

    if (input && input.length >= 3) {
      if (!filter || filter === 'country') {
        url = `${this.baseUrl}/name/${input}`;
      } else {
        url = `${this.baseUrl}/${filter}/${input}`;
      }
    }

    return this.http.get<Country[]>(url).pipe(
      tap(countries => this.countriesSubject.next(countries)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('Countries not found'));
    }
    return throwError(() => new Error('An error occurred'));
  }
}
