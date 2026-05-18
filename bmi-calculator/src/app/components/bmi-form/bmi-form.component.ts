import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BmiMeasurement } from '../../models/bmi-record.model';

@Component({
  selector: 'app-bmi-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './bmi-form.component.html',
  styleUrls: ['./bmi-form.component.scss']
})
export class BmiFormComponent {
  @Input() isCalculating = false;
  @Output() calculateBmi = new EventEmitter<BmiMeasurement>();
  @Output() resetForm = new EventEmitter<void>();

  readonly units = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'ft' }
  ];

  readonly weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lb', label: 'lb' }
  ];

  form = new FormGroup({
    height: new FormControl<number | null>(null, [Validators.required, Validators.min(0.1)]),
    heightUnit: new FormControl<'cm' | 'ft'>('cm', { nonNullable: true }),
    weight: new FormControl<number | null>(null, [Validators.required, Validators.min(0.1)]),
    weightUnit: new FormControl<'kg' | 'lb'>('kg', { nonNullable: true })
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.calculateBmi.emit(this.form.value as BmiMeasurement);
  }

  reset(): void {
    this.form.reset({
      heightUnit: 'cm',
      weightUnit: 'kg'
    });
    this.resetForm.emit();
  }

  get heightControl(): FormControl {
    return this.form.controls.height as FormControl;
  }

  get weightControl(): FormControl {
    return this.form.controls.weight as FormControl;
  }

  sayHi(): void { 
    console.log('Welcome to MCP Server Application');
  }
}
