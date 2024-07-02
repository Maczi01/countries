import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { Country } from '../../types/Country';
import { CommonModule } from '@angular/common';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, CountryCardComponent, ReactiveFormsModule],
  templateUrl: './explore.component.html',
})
export class ExploreComponent implements OnInit {
  countries: Country[] = [];
  form: FormGroup;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      input: [''],
      filter: ['country'],
      sort: ['alphabetical'],
    });
  }

  ngOnInit() {
    this.form
      .get('input')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          this.isLoading = true;
          this.error = null;
          return this.countryService.getCountries(this.form.get('filter')?.value, value);
        }),
      )
      .subscribe({
        next: data => {
          this.countries = this.sortCountries(data, this.form.get('sort')?.value);
          this.isLoading = false;
        },
        error: err => {
          this.error = err;
          this.isLoading = false;
        },
      });

    this.form.get('filter')?.valueChanges.subscribe(() => {
      this.fetchCountries();
    });

    this.form.get('sort')?.valueChanges.subscribe(() => {
      this.countries = this.sortCountries(this.countries, this.form.get('sort')?.value);
    });

    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.error = null;
    this.countryService
      .getCountries(this.form.get('filter')?.value, this.form.get('input')?.value)
      .subscribe({
        next: data => {
          this.countries = this.sortCountries(data, this.form.get('sort')?.value);
          this.isLoading = false;
        },
        error: err => {
          this.error = err;
          this.isLoading = false;
        },
      });
  }

  sortCountries(data: Country[], sort: string): Country[] {
    switch (sort) {
      case 'alphabetical':
        return data.sort((a, b) => (a.name.common >= b.name.common ? 1 : -1));
      case 'population':
        return data.sort((a, b) => a.population - b.population);
      default:
        return data;
    }
  }

  get inputControl(): FormControl {
    return this.form.get('input') as FormControl;
  }

  get filterControl(): FormControl {
    return this.form.get('filter') as FormControl;
  }

  get sortControl(): FormControl {
    return this.form.get('sort') as FormControl;
  }

  trackByName(index: number, country: Country): string {
    return country.name.common;
  }
}
