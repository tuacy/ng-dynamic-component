import {DynamicBaseConfig} from '../config';

export class DialogConfig extends DynamicBaseConfig {
    /**
     * 是否显示取消按钮，用于区分alert和dialog
     */
    showCancel?: boolean;
    /**
     * 弹窗标题
     */
    title?: string;
    /**
     * 内容
     */
    body?: string;
    /**
     * 确认文字
     */
    ok?: string;
    /**
     * 取消文字
     */
    no?: string;
}
