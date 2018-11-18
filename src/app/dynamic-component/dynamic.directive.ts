import {ComponentFactoryResolver, Directive, Type, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[dynamicTemplate]'
})
export class DynamicDirective {

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    /**
     * 动态组件容器里面添加我们自定义的组件(包含关系)
     * @param component 自定义的组件
     */
    attachComponent<T>(component: Type<T>) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.viewContainerRef.clear();
        this.viewContainerRef.createComponent(factory);
    }

}
