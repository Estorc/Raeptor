import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatherServicesGlobalInjectable {
  // Define a global variable
  [key: string]: any;

  constructor() {}
}