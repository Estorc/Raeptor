import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaeptorServicesGlobalInjectable {
  // Define a global variable
  [key: string]: any;

  constructor() {}
}