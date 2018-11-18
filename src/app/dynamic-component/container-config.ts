import {DynamicBaseConfig} from './base-config';

export interface ContainerConfig extends DynamicBaseConfig {
    /**
     * [transition]透明点击无效
     * [mask]点击后关闭
     * [strict]点击无效
     * [none]无遮罩
     * [loose]透明点击后关闭
     */
    background?: 'transition' | 'mask' | 'strict' | 'none' | 'loose';
}
