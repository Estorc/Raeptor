import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { RaeptorServicesCursorPositionStyleVariable } from '@raeptor/services/global/raeptor.services.cursor.position.style.variable';

@Component({
  selector: 'raeptor-main-page',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
})
export class MainComponent {
  constructor(private cursor: RaeptorServicesCursorPositionStyleVariable) {
    
  }
}
