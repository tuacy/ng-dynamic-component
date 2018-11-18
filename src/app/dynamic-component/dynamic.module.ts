import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDirective} from './dynamic.directive';
import {DialogContainerComponent} from './dialog/container.component';
import {TemplateComponent} from './dialog/template.component';
import {DynamicService} from './dynamic-service';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
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
