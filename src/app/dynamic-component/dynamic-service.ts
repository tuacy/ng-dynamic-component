import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {Injectable, Injector} from '@angular/core';
import {DialogContainerComponent} from './dialog/container.component';
import {DialogConfig} from './dialog/config';
import {DIALOG_CONTAINER_DATA} from './dialog/consts';
import {PortalInjector} from './portal-injector';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class DynamicService {

    public overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private injector: Injector/*,
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef*/) {
        this.overlayRef = this.overlay.create();
    }

    //
    // // 手动创建组件, 不能删掉
    // // 注意: we never clean up the container component and it's overlay resources, if we should, we need to do it by our own codes.
    // private createContainer<T>(component: Type<T>): T {
    //     const factory = this.cfr.resolveComponentFactory(component);
    //     const componentRef = factory.create(this.injector); // Use root injector
    //     componentRef.changeDetectorRef.detectChanges(); // Immediately change detection to avoid multi-checking error
    //     this.appRef.attachView(componentRef.hostView); // Load view into app root
    //     const overlayPane = this.overlay.create().overlayElement;
    //     overlayPane.style.zIndex = '1010'; // Patching: assign the same zIndex of ant-message to it's parent overlay panel,
    //     overlayPane.appendChild((componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[0] as HTMLElement);
    //     return componentRef.instance;
    // }

    /**
     * 手动创建dialog
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
        // 这一步要把遮罩的配置作为服务注入容器组件
        const injectionTokens = new WeakMap();
        injectionTokens.set(DIALOG_CONTAINER_DATA, config || {});
        this.overlayRef.overlayElement.style.zIndex = '1010'; // set zIndex
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        } else {
            this.overlayRef.attach(new ComponentPortal(DialogContainerComponent
                , null
                , new PortalInjector(this.injector, injectionTokens)));
        }
    }
}
