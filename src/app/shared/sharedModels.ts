import { Observable } from 'rxjs';

export interface MapObject {
  address: string;
  longitude: number;
  latitude: number;
}

export interface Madrasa {
  id: string;
  img: string;
  name: string;
  description: string;
  headName: string;
  registrationDate: string;
  registrationNumber: string;
  city: string;
  phone: string;
  headId?: any;
  address?: MapObject;

  applications?: any[];
  aalims?: any[];
}

export interface Aalim {
  id: string;
  name: string;
  phone: string;
  madrasaId?: string;
  location: string;
  img: string;
  bio: string;
  contacts: any;

  madrasa?: Observable<Madrasa>;
}
export interface Car {
  id: number;
  model: string;
  brand: string;
  year: string;
  interiorColor: string;
  exteriorColor: string;
  price: number;
  mileage?: number;
  fuelType: string;
  locations: string[];
  condition: string;
  bodyStyle: string;
  transmission: string;
  multimedia: string[];
  safety: string[];
  comfort: string[];
  visibility: string[];
  exterior: string[];
  interior: string[];
  description: string;
  gallery: string[];
  prices: Price[];
  extras: Extra[];
  engine: Engine;
  fuel: Fuel;

  emission: Emission;
}

export interface Extra {
  id?: number;
  name: string;
  Price: number;
}

export interface Emission {
  type: string;
  displacement: string;
}

export interface Fuel {
  highway: number;
  combined: number;
  fuelTank: number;
  emissionClass: string;
}

export interface Engine {
  noOfCylinder: number;
  engineVolume: number;
  horsePower: number;
  tourque: number;
}

export interface Price {
  days: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  photoUrl: string;
  phoneNumber: string;
  emailVerified: boolean;
  userType: string;
}

export interface Order {
  key?: any;
  userId: string;
  carId: number;
  orderDate: string;
  approvalStatus: string;

  pickup: Pickup;
  return: Pickup;
  extras: Extra[];

  user?: Observable<User>;
  car?: Observable<Car>;
}

export interface Pickup {
  time: string;
  date: string;
  location: string;
}
