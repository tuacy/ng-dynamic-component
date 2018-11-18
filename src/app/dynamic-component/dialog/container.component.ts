import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {dialog, mask} from '../animations';
import {DynamicDirective} from '../dynamic.directive';
import {TemplateComponent} from './template.component';

@Component({
    selector: 'app-dynamic-dialog-container',
    template: `
        <div>
            abac
        </div>
        <div>
            <ng-template dynamicTemplate></ng-template>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [dialog, mask]
})
export class DialogContainerComponent implements OnInit, AfterViewInit {

    @ViewChild(DynamicDirective) private containerContentHost: DynamicDirective;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.containerContentHost.attachComponent(TemplateComponent);
    }

}
