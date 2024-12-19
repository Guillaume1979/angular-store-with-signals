export class Vehicle {
  name?: string;
  model?: string;
  cost_in_credits?: number;
  crew?: number;
  passenger?: number;

  constructor(init?: Partial<Vehicle>) {
    Object.assign(this, init)
}
}

export type Vehicles = Vehicle[];

export type VehicleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[];
}
