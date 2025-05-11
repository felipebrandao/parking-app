import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Vehicle} from '../../models/vehicle';
import {MatSort} from '@angular/material/sort';
import {VehicleService} from '../../services/vehicle.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleFormDialogComponent} from '../vehicle-form-dialog/vehicle-form-dialog.component';
import {MatConfirmDialogComponent} from '../../../shared/mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'app-vehicle',
  standalone: false,
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'licensePlate', 'actions'];

  dataSource = new MatTableDataSource<Vehicle>();
  loading = false;
  error: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data: Vehicle[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.error = null;
      },
      error: (error) => {
        this.error = 'Erro ao carregar os veículos.';
        console.error(error);
        this.loading = false;
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.addVehicle(result).subscribe({
          next: (newVehicle) => {
            this.dataSource.data = [ ...this.dataSource.data, newVehicle];
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  openEditDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicle: vehicle, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedVehicle = { ...vehicle, ...result };
        this.vehicleService.updateVehicle(vehicle.id, updatedVehicle).subscribe({
          next: (updated) => {
            const index = this.dataSource.data.findIndex(v => v.id === vehicle.id);
            if (index > -1) {
              this.dataSource.data[index] = updated;
              this.dataSource._updateChangeSubscription();
            }
          }
        });
      }
    });
  }


  deleteVehicle(id: string): void {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Tem certeza que deseja deletar este veículo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.deleteVehicle(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(v => v.id !== id);
            this.dataSource._updateChangeSubscription();
          },
          error: (error) => {
            console.error('Erro ao deletar o veículo:', error);
          }
        });
      }
    });
  }

}
