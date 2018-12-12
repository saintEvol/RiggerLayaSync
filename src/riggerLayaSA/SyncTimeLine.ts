/**
* name 
*/
module riggerLayaSA {
	export class SyncTimeLine extends riggerIOC.WaitableTask<Laya.TimeLine>{
		protected startTimeOrLabel: number | string = null;
		protected loop: boolean = null;

		private static pool: riggerIOC.Pool = new riggerIOC.Pool();
		private static sign: string = "_sign";

		public get scale(): number {
			return this.mContent.scale;
		}

		public set scale(s: number) {
			this.mContent.scale = s;
		}

		constructor() {
			super(new Laya.TimeLine());
		}

		static create(): SyncTimeLine {
			return SyncTimeLine.pool.getItemByClass<SyncTimeLine>(SyncTimeLine.sign, SyncTimeLine);
		}

		/**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
		static to(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine {
			let ret: SyncTimeLine = SyncTimeLine.create();
			ret.to(target, props, duration, ease, offset);

			return ret;
		}
        /**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
		static from(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine {
			let ret: SyncTimeLine = SyncTimeLine.create();
			ret.from(target, props, duration, ease, offset);

			return ret;
		}

		/**
		 * 回收
		 * @param item 
		 */
		recover():void{
			SyncTimeLine.pool.recover<SyncTimeLine>(SyncTimeLine.sign, this.reset());
		}

		/**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
		to(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine {
			this.mContent.to(target, props, duration, ease, offset);
			return this;
		}

		/**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
		from(target: any, props: any, duration: number, ease?: Function, offset?: number): SyncTimeLine {
			this.mContent.from(target, props, duration, ease, offset);
			return this;
		}

		/**
         * 在时间队列中加入一个标签。
         * @param	label	标签名称。
         * @param	offset	标签相对于上个动画的偏移时间(单位：毫秒)。
         */
		addLabel(label: string, offset: number): SyncTimeLine {
			this.mContent.addLabel(label, offset);
			return this;
		}

        /**
         * 移除指定的标签
         * @param	label
         */
		removeLabel(label: string): void {
			this.mContent.removeLabel(label);
		}

        /**
         * 动画从整个动画的某一时间开始。
         * @param	time(单位：毫秒)。
         */
		gotoTime(time: number, immediately: boolean = false): SyncTimeLine {
			return this.play(time, false, immediately)
		}

        /**
         * 从指定的标签开始播。
         * @param	Label 标签名。
         */
		gotoLabel(Label: string, immediately: boolean = false): SyncTimeLine {
			return this.play(Label, false, immediately)
		}

        /**
         * 暂停整个动画。
         */
		pause(): void {
			this.mContent.pause();
		}
        /**
         * 恢复暂停动画的播放。
         */
		resume(): void {
			this.mContent.resume();
		}
        /**
         * 播放动画。
         * @param	timeOrLabel 开启播放的时间点或标签名。
         * @param	loop 是否循环播放。
         * @param	immediately 是否立即开始播放，默认为false,如果为false，则要在wait后才会开始播放
		 * 
         */
		play(timeOrLabel?: any, loop?: boolean, immediately: boolean = false): SyncTimeLine {
			if (!this.mContent) return;

			this.startTimeOrLabel = timeOrLabel;
			this.loop = loop;

			if (immediately) {
				this.doPlay();
			}

			return this;
		}

		cancel(reason?: any) {
			if (!this.mContent) return;
			this.mContent.pause();

			super.cancel(reason);
		}

        /**
         * @private
         * 得到帧索引
         */
		public get index(): number {
			return this.mContent.index;
		}

        /**
         * @private
         * 设置帧索引
         */
		public set index(idx: number) {
			this.mContent.index = idx;
		}

        /**
         * 得到总帧数。
         */
		public get total(): number {
			return this.mContent.total;
		}

        /**
         * 重置所有对象，复用对象的时候使用。
         */
		reset(): SyncTimeLine {
			this.mContent.reset();
			super.reset();

			return this;
		}

        /**
         * 彻底销毁此对象。
         */
		destroy(): void {
			this.dispose();
		}

		dispose(): void {
			this.mContent.offAll();
			this.mContent.destroy();
			this.mContent = null;
			super.dispose();
		}

		protected startTask(): SyncTimeLine {
			super.startTask();
			this.doPlay();

			return this;
		}

		private onComplete(): void {
			this.done();
		}

		private onLabel(): void {

		}

		private doPlay(): void {
			if (!this.mContent.hasListener(Laya.Event.COMPLETE)) {
				this.mContent.once(Laya.Event.COMPLETE, this, this.onComplete);
			}
			this.mContent.play(this.startTimeOrLabel, this.loop);
			this.startTimeOrLabel = this.loop = null;
		}

		private isLabel(timeOrLabel): boolean {
			if (typeof timeOrLabel === "string") {
				return true;
			}

			return false;
		}
	}
}