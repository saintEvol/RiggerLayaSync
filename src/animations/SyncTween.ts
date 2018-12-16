/**
* 同步版Tween
*/
module riggerLayaSync {
	export class SyncTween extends riggerIOC.WaitableTask<Laya.Tween>{
		private static pool: riggerIOC.Pool = new riggerIOC.Pool();
		private static sign: "_sign";

		private static TWEEN_FROM = 1;
		private static TWEEN_TO = 2;

		private completeHandler: Laya.Handler;

		constructor() {
			super();
			this.mContent = new Laya.Tween();
			this.completeHandler = Laya.Handler.create(this, this.onComplete, null, false);
		}

		public get gid(): number {
			return this.mContent.gid;
		}
		public set gid(gid: number) {
			this.mContent.gid = gid;
		}

		/**更新回调，缓动数值发生变化时，回调变化的值*/
		public get update(): Laya.Handler {
			return this.mContent.update;
		}
		public set update(handler: Laya.Handler) {
			this.mContent.update = handler;
		}

		static create(): SyncTween {
			return SyncTween.pool.getItemByClass(SyncTween.sign, SyncTween);
		}

        /**
         * 缓动对象的props属性到目标值。
         * @param	target 目标对象(即将更改属性值的对象)。
         * @param	props 变化的属性列表，比如
         * @param	duration 花费的时间，单位毫秒。
         * @param	ease 缓动类型，默认为匀速运动。
         * @param	complete 结束回调函数。
         * @param	delay 延迟执行时间。
         * @param	coverBefore 是否覆盖之前的缓动。
         * @param	autoRecover 是否自动回收，默认为true，缓动结束之后自动回收到对象池。
         * @return	返回Tween对象。
         */
		static to(target: any, props: any, duration: number, ease?: Function, complete?: Laya.Handler, delay?: number, coverBefore?: boolean, autoRecover: boolean = true): SyncTween {
			let tween: SyncTween = SyncTween.create();
			tween.autoRecover = autoRecover;
			return tween.to(target, props, duration, ease, complete, delay, coverBefore);
		}
        /**
         * 从props属性，缓动到当前状态。
         * @param	target 目标对象(即将更改属性值的对象)。
         * @param	props 变化的属性列表，比如
         * @param	duration 花费的时间，单位毫秒。
         * @param	ease 缓动类型，默认为匀速运动。
         * @param	complete 结束回调函数。
         * @param	delay 延迟执行时间。
         * @param	coverBefore 是否覆盖之前的缓动。
         * @param	autoRecover 是否自动回收，默认为true，缓动结束之后自动回收到对象池。
         * @return	返回Tween对象。
         */
		static from(target: any, props: any, duration: number, ease?: Function, complete?: Laya.Handler, delay?: number, coverBefore?: boolean, autoRecover: boolean = true): SyncTween {
			let tween: SyncTween = SyncTween.create();
			tween.autoRecover = autoRecover;
			return tween.from(target, props, duration, ease, complete, delay, coverBefore);
		}
        /**
         * 缓动对象的props属性到目标值。
         * @param	target 目标对象(即将更改属性值的对象)。
         * @param	props 变化的属性列表，比如
         * @param	duration 花费的时间，单位毫秒。
         * @param	ease 缓动类型，默认为匀速运动。
         * @param	complete 结束回调函数。
         * @param	delay 延迟执行时间。
         * @param	coverBefore 是否覆盖之前的缓动。
         * @return	返回Tween对象。
         */
		to(target: any, props: any, duration: number, ease?: Function, complete?: Laya.Handler, delay?: number, coverBefore?: boolean): SyncTween {
			if (this.isWaitting()) {
				this.outComplete = complete;
				this.mContent.to(target, props, duration, ease, this.completeHandler, delay, coverBefore);
			}
			else {
				this.setTweenParams(SyncTween.TWEEN_TO, target, props, duration, ease, complete, delay, coverBefore);
			}
			return this;
		}

        /**
         * 从props属性，缓动到当前状态。
         * @param	target 目标对象(即将更改属性值的对象)。
         * @param	props 变化的属性列表，比如
         * @param	duration 花费的时间，单位毫秒。
         * @param	ease 缓动类型，默认为匀速运动。
         * @param	complete 结束回调函数。
         * @param	delay 延迟执行时间。
         * @param	coverBefore 是否覆盖之前的缓动。
         * @return	返回Tween对象。
         */
		from(target: any, props: any, duration: number, ease?: Function, complete?: Laya.Handler, delay?: number, coverBefore?: boolean): SyncTween {
			if (this.isWaitting()) {
				this.outComplete = complete;
				this.mContent.from(target, props, duration, ease, this.completeHandler, delay, coverBefore);
			}
			else {
				this.setTweenParams(SyncTween.TWEEN_FROM, target, props, duration, ease, complete, delay, coverBefore);
			}
			return this;
		}

		// _create(target: any, props: any, duration: number, ease: Function, complete: Laya.Handler, delay: number, coverBefore: boolean, isTo: boolean, usePool: boolean, runNow: boolean): SyncTween {
		// 	this.mContent._create(target, props, duration, ease, complete, delay, coverBefore, isTo, usePool, runNow)
		// 	return this;
		// }

		private autoRecover: boolean = true;

		// _updateEase(time: number): void;
		/**设置当前执行比例**/
		public get progress(): number {
			return this.mContent.progress;
		}
		public set progress(p: number) {
			this.mContent.progress = p;
		}

        /**
         * 立即结束缓动并到终点。
         */
		complete(): void {
			this.mContent.complete();
		}

        /**
         * 暂停缓动，可以通过resume或restart重新开始。
         */
		pause(): void {
			this.mContent.pause();
		}

        /**
         * 设置开始时间。
         * @param	startTime 开始时间。
         */
		setStartTime(startTime: number): void {
			this.mContent.setStartTime(startTime);
		}

        /**
         * 清理指定目标对象上的所有缓动。
         * @param	target 目标对象。
         */
		static clearAll(target: any): void {
			Laya.Tween.clearAll(target);
		}

        /**
         * 清理某个缓动。
         * @param	tween 缓动对象。
         */
		static clear(tween: SyncTween): void {
			Laya.Tween.clear(tween.mContent);
		}

		static clearTween(target: any): void {
			Laya.Tween.clearTween(target);
		}

		cancel(reason: any){
			super.cancel(reason);
			this.clear();
			if(this.autoRecover) this.recover();
		}

        /**
         * 停止并清理当前缓动。
         */
		clear(): void {
			this.mContent.clear();
			if(this.outComplete) this.outComplete = null;
			this.props = null;
			this.target = null;
			this.ease = null;
		}

        /**
         * @private
         */
		// _clear(): void;
		/** 回收到对象池。*/
		recover(): void {
			this.clear();
			this.reset();
			SyncTween.pool.recover(SyncTween.sign, this);
		}
        /**
         * 重新开始暂停的缓动。
         */
		restart(): void {
			this.mContent.restart();
		}

        /**
         * 恢复暂停的缓动。
         */
		resume(): void {
			this.mContent.resume();
		}

		private tweenType: number;
		private target: any;
		private props: any;
		private duration: number;
		private ease?: Function;
		private outComplete?: Laya.Handler;
		private delay?: number;
		private coverBefore?: boolean;
		private setTweenParams(fromOrTo: number, target: any, props: any, duration: number, ease?: Function, complete?: Laya.Handler, delay?: number, coverBefore?: boolean) {
			this.tweenType = fromOrTo;
			this.target = target;
			this.props = props;
			this.duration = duration;
			this.ease = ease;
			this.outComplete = complete;
			this.delay = delay;
			this.coverBefore = coverBefore;
		}

		protected startTask(): SyncTween {
			super.startTask();
			this.startTween();

			return this;
		}

		private startTween(): void {
			if (!this.mContent) return;
			if (this.tweenType == SyncTween.TWEEN_FROM) {
				this.mContent.from(this.target, this.props, this.duration, this.ease, this.completeHandler, this.delay, this.coverBefore);
			}
			else if (this.tweenType == SyncTween.TWEEN_TO) {
				this.mContent.to(this.target, this.props, this.duration, this.ease, this.completeHandler, this.delay, this.coverBefore);
			}
		}

		private onComplete() {
			this.outComplete && this.outComplete.run();
			this.done();
			this.clear();
			if(this.autoRecover) this.recover();
		}
	}
}