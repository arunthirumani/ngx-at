import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  dataList = ['apple', 'banana', 'carrot', 'mango', 'orange', 'kiwi'];
}
