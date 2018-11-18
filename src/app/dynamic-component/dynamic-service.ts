import {Overlay} from '@angular/cdk/overlay';
import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {DialogContainerComponent} from './dialog/container.component';
import {DialogConfig} from './dialog/config';

@Injectable({
    providedIn: 'root'
})
export class DynamicService {

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef) {
    }

    // 手动创建组件
    // 注意: we never clean up the container component and it's overlay resources, if we should, we need to do it by our own codes.
    private createContainer<T>(component: Type<T>): T {
        const factory = this.cfr.resolveComponentFactory(component);
        const componentRef = factory.create(this.injector); // Use root injector
        componentRef.changeDetectorRef.detectChanges(); // Immediately change detection to avoid multi-checking error
        this.appRef.attachView(componentRef.hostView); // Load view into app root
        const overlayPane = this.overlay.create().overlayElement;
        overlayPane.style.zIndex = '1010'; // Patching: assign the same zIndex of ant-message to it's parent overlay panel,
        overlayPane.appendChild((componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[0] as HTMLElement);
        return componentRef.instance;
    }

    /**
     * 弹出dialog
     * @param config
     */
    public dialog(config?: DialogConfig) {
        config = config || {};
        config = {
            title: config.title || '消息',
            body: config.body || ' ',
            ok: config.ok || '确认',
            no: config.no || '取消',
            background: config.background || 'mask',
            showCancel: true
        };
        return this.createContainer(DialogContainerComponent);
    }
}
