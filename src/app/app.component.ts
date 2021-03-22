import { Component } from '@angular/core';

@Component({
  selector: 'web-root',
  template: `<web-main-nav></web-main-nav>`,
  styles: [
    `
      * {
        margin: 0;
      }
    `,
  ],
})
export class AppComponent {}
