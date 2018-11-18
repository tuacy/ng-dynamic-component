import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {dialog, mask} from '../animations';
import {DynamicDirective} from '../dynamic.directive';
import {TemplateComponent} from './template.component';
import {DIALOG_CONTAINER_DATA} from './consts';

@Component({
    selector: 'app-dynamic-dialog-container',
    template: `
        <div class="dynamic-mask"
             [@mask]="(data.background === 'transition' || data.background === 'loose') ? 'exit' : _state" (click)="close()">
        </div>
        <div [@dialog]="_state" (@dialog.start)="_onAnimationStart($event)" (@dialog.done)="_onAnimationDone($event)">
            <ng-template dynamicTemplate></ng-template>
        </div>
    `,
    styleUrls: ['./container.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [dialog, mask]
})
export class DialogContainerComponent implements AfterViewInit {

    public animationStateChange = new EventEmitter<AnimationEvent>();
    public _state: 'void' | 'enter' | 'exit' = 'enter';
    private isAnimating = false;
    @ViewChild(DynamicDirective) private containerContentHost: DynamicDirective;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                @Inject(DIALOG_CONTAINER_DATA) public data: any) {
        console.log(data);
    }

    ngAfterViewInit(): void {
        this.containerContentHost.attachComponent(TemplateComponent);
    }

    public _onAnimationDone(event: AnimationEvent) {
        this.animationStateChange.emit(event);
        this.isAnimating = false;
    }

    /** Callback, invoked when an animation on the host starts. */
    public _onAnimationStart(event: AnimationEvent) {
        this.isAnimating = true;
        this.animationStateChange.emit(event);
    }

    /** Starts the dialog exit animation. */
    public _startExitAnimation(): void {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this.changeDetectorRef.markForCheck();
    }

    // 从遮罩关闭
    public close() {
        if (this.data.background === 'mask' || this.data.background === 'loose') {
            this._startExitAnimation();
        }
    }

}
