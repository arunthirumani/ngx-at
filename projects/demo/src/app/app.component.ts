import { Component } from '@angular/core';

export type WidgetList=  'chipInput' | 'dropdownList';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showWidget = false;
  widgetType: WidgetList;
  
  widgetLinkHandler(type: WidgetList) {
    this.showWidget = true;
    this.widgetType = type;
  }
  
  backHandler() {
    this.showWidget = false;
    this.widgetType = null;
  }
}
