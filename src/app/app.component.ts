import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ShipComponent} from './ship.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShipComponent, ShipComponent],
  template: `
    <h1>Test des nouvelles API d'Angular</h1>
    <app-ship/>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-store';
}
