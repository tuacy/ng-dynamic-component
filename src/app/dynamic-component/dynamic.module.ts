import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDirective} from './dynamic.directive';
import {DialogContainerComponent} from './dialog/container.component';
import {TemplateComponent} from './dialog/template.component';
import {DynamicService} from './dynamic-service';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [
        DialogContainerComponent,
        TemplateComponent,
        DynamicDirective
    ],
    providers: [
        DynamicService
    ],
    entryComponents: [
        DialogContainerComponent,
        TemplateComponent
    ]
})
export class DynamicModule {
}
