import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Vehicle} from '../../models/vehicle';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface VehicleFormDialogData {
  vehicle?: Vehicle;
  isEdit: boolean;
}

@Component({
  selector: 'app-vehicle-form-dialog',
  standalone: false,
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrl: './vehicle-form-dialog.component.scss'
})
export class VehicleFormDialogComponent  {
  vehicleForm: FormGroup<{
    brand: FormControl<string>;
    model: FormControl<string>;
    licensePlate: FormControl<string>;
  }>;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleFormDialogData
  ) {
    this.title = data.isEdit ? 'Editar Veículo' : 'Adicione o veículo';

    this.vehicleForm = this.fb.group({
      brand: new FormControl(data.vehicle?.brand || '', { nonNullable: true, validators: Validators.required }),
      model: new FormControl(data.vehicle?.model || '', { nonNullable: true, validators: Validators.required }),
      licensePlate: new FormControl(data.vehicle?.licensePlate || '', { nonNullable: true, validators: Validators.required }),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleForm.valid) {
      const vehicleData = this.vehicleForm.value;
      const result = this.data.isEdit && this.data.vehicle?.id
        ? { id: this.data.vehicle.id, ...vehicleData }
        : vehicleData;
      this.dialogRef.close(result);
    }
  }
}
