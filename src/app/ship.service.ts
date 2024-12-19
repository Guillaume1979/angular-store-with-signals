import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicle, VehicleResponse, Vehicles} from './models';
import {delay, map, Observable} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  API = 'https://swapi.py4e.com/api'
  http = inject(HttpClient)

  vehicles = computed(() => this.vehiclesResource.value());
  isLoadingAll = computed(() => this.vehiclesResource.isLoading() && this.shipResource.isLoading());
  vehiclesAreLoading = computed(() => this.vehiclesResource.isLoading());
  vehicleDetailIsLoading = computed(() => this.shipResource.isLoading());
  selectedVehicleId = signal<number>(1)
  selectedVehicleDetail = computed(() => this.shipResource.value());

  reloadVehicles() {
    this.vehiclesResource.reload()
  }

  reloadAll() {
    this.vehiclesResource.reload()
    this.shipResource.reload()
  }

  private vehiclesResource = rxResource({
    loader: ()=> this.getShips()
  })

  getShips(): Observable<Vehicles> {
    return this.http.get<VehicleResponse>(`${this.API}/vehicles`).pipe(
      map((response) => response.results),
      delay(2000)
    );
  }

  shipResource = rxResource({
    request: ()=> ({
                     id: this.selectedVehicleId()
                   }),
    loader: ({request})=> this.getShipDetail(request.id)
  })

  getShipDetail(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.API}/vehicles/${id}`).pipe(
      delay(2000)
    )
  }
}
