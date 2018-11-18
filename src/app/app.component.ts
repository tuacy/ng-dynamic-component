import {Component} from '@angular/core';
import {DynamicService} from './dynamic-component/dynamic-service';

@Component({
    selector: 'app-root',
    template: `
        <h1> 动态创建组件 </h1>
        <button (click)="createDialogComponent()">dialog</button>
    `,
    styleUrls: ['./app.component.less']
})
export class AppComponent {

    constructor(private dynamicService: DynamicService) {
    }

    createDialogComponent() {
        this.dynamicService.dialog();
    }
}
