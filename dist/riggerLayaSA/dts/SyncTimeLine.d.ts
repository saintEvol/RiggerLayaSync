/**
* name
*/
declare module riggerLayaSA {
    class SyncTimeLine extends riggerIOC.WaitableTask<Laya.TimeLine> {
        protected startTimeOrLabel: number | string;
        protected loop: boolean;
        scale: number;
        constructor();
        /**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
        static to(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine;
        /**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
        static from(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine;
        /**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
        to(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine;
        /**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
        from(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine;
        /**
         * 在时间队列中加入一个标签。
         * @param	label	标签名称。
         * @param	offset	标签相对于上个动画的偏移时间(单位：毫秒)。
         */
        addLabel(label: string, offset: number): SyncTimeLine;
        /**
         * 移除指定的标签
         * @param	label
         */
        removeLabel(label: string): void;
        /**
         * 动画从整个动画的某一时间开始。
         * @param	time(单位：毫秒)。
         */
        gotoTime(time: number, immediately?: boolean): SyncTimeLine;
        /**
         * 从指定的标签开始播。
         * @param	Label 标签名。
         */
        gotoLabel(Label: string, immediately?: boolean): SyncTimeLine;
        /**
         * 暂停整个动画。
         */
        pause(): void;
        /**
         * 恢复暂停动画的播放。
         */
        resume(): void;
        /**
         * 播放动画。
         * @param	timeOrLabel 开启播放的时间点或标签名。
         * @param	loop 是否循环播放。
         * @param	immediately 是否立即开始播放，默认为false,如果为false，则要在wait后才会开始播放
         *
         */
        play(timeOrLabel?: any, loop?: boolean, immediately?: boolean): SyncTimeLine;
        cancel(reason?: any): void;
        /**
         * @private
         * 得到帧索引
         */
        /**
        * @private
        * 设置帧索引
        */
        index: number;
        /**
         * 得到总帧数。
         */
        readonly total: number;
        /**
         * 重置所有对象，复用对象的时候使用。
         */
        reset(): SyncTimeLine;
        /**
         * 彻底销毁此对象。
         */
        destroy(): void;
        dispose(): void;
        protected startTask(): SyncTimeLine;
        private onComplete;
        private onLabel;
        private doPlay;
        private isLabel;
    }
}
