import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'pui-example';
  value = '123';
  disabled = false;

  change() {
    this.disabled = !this.disabled;
  }
}
