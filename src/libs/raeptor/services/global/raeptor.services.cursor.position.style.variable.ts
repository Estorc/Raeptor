import { Injectable } from "@angular/core";
import { RaeptorServicesWindowsReference } from "./raeptor.services.windows.reference";

@Injectable({ providedIn: 'root' })
export class RaeptorServicesCursorPositionStyleVariable {
  constructor(private winRef: RaeptorServicesWindowsReference) {
    const win = this.winRef.nativeWindow;
    if (!win) return; // running on server

    win.addEventListener('mousemove', ev => {
      win.document.documentElement.style.setProperty('--cursorX', ev.clientX + 'px');
      win.document.documentElement.style.setProperty('--cursorY', ev.clientY + 'px');
    });
  }
}
