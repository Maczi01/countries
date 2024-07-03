import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type Filters = { input: string; filter: string; sort: string };

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Filters>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: [''],
      filter: ['country'],
      sort: ['alphabetical'],
    });
  }

  changeFilters(value: Filters) {
    this.filterChange.emit({ input: value.input, filter: value.filter, sort: value.sort })
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(values => {
        this.filterChange.emit(values);
      });
  }

  get inputControl(): FormControl {
    return this.form.controls['input'] as FormControl;
  }

  get filterControl(): FormControl {
    return this.form.controls['filter'] as FormControl;
  }

  get sortControl(): FormControl {
    return this.form.controls['sort'] as FormControl;
  }
}
