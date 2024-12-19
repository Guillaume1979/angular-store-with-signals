import {Component, inject} from '@angular/core';
import {ShipService} from './ship.service';

@Component({
  selector: 'app-ship',
  imports: [],
  template: `
    @if (vehicleService.isLoadingAll()) {
      <p>Loading...</p>
    } @else {
      @if (vehicleService.vehiclesAreLoading()) {
        <p>Loading...</p>
      } @else {
        <ul>
          @for (vehicle of vehicles(); track vehicle.name) {
            <li>{{ vehicle.model }}</li>
          }
        </ul>
        <button (click)="vehicleService.reloadVehicles()">Reload List</button>
        <hr>
      }

      <button (click)="getOne(4)">Select Vehicle 4</button>
      <button (click)="getOne(6)">Select Vehicle 6</button>

      @if (vehicleService.vehicleDetailIsLoading()) {
        <p>Loading...</p>
      } @else {
        <p>{{ selectedVehicle()?.name }}</p>
      }
      <hr>
      <button (click)="vehicleService.reloadAll()">Reload Everything</button>
    }


  `,
  styles: [`
  :host {}
  `]
})
export class ShipComponent {

  protected vehicleService = inject(ShipService);

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicleDetail;

  getOne(number: number) {
    this.vehicleService.selectedVehicleId.set(number)
  }
}
