import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<{ input: string; filter: string; sort: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: [''],
      filter: ['country'],
      sort: ['alphabetical'],
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(values => {
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
