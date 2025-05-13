import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'raeptor-main-page',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
})
export class MainComponent {}
