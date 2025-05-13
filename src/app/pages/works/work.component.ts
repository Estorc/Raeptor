import { Component, Host, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  template: `<iframe [src]="safeUrl" width="100%" height="100%" style="border: none;" sandbox="allow-scripts allow-popups allow-same-origin"></iframe>`,
  styles: [
    `
      :host {
          overflow: hidden;
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100dvw;
          height: 100dvh;
      }
    `,
  ],
  standalone: true,
})
export class WorkComponent implements OnInit {
  constructor(private sanitizer : DomSanitizer, private route : ActivatedRoute, private router : Router) {}
  public safeUrl: SafeResourceUrl = null!;
  public pageUrl: string | null = '';
  ngOnInit() {
    this.pageUrl = 'assets/works';
    let subUrl;
    let i = 1;
    do {
      subUrl = this.route.snapshot.paramMap.get(`workName${i++}`);
      if (subUrl) {
        this.pageUrl += `/${subUrl}`;
      }
    }
    while (subUrl);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrl);
  }

  @HostListener('window:message', ['$event'])
  handleMessage(event: MessageEvent) {
    console.log(event);
    // Always validate the origin for security purposes
    if (!event.isTrusted) {
      return; // Ignore if the message comes from an untrusted source
    }

    // Check if the message contains the action to change the URL
    if (event.data?.action === 'changeUrl') {
      const newUrl = event.data?.url;

      // Use Angular Router to navigate to the new URL
      if (newUrl) {
        this.router.navigateByUrl(newUrl);
      }
    }
  }
}
