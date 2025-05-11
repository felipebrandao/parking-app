import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vehicle} from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly API_URL = environment.API_URL + '/vehicle';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.API_URL);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Vehicle>(url);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.API_URL, vehicle);
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<Vehicle>(url, vehicle);
  }

  deleteVehicle(id: string): Observable<void> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url);
  }
}
