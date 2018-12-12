var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
* 同步版Tween
*/
var riggerLayaSA;
(function (riggerLayaSA) {
    var SyncTween = /** @class */ (function (_super) {
        __extends(SyncTween, _super);
        function SyncTween() {
            var _this = _super.call(this) || this;
            // _create(target: any, props: any, duration: number, ease: Function, complete: Laya.Handler, delay: number, coverBefore: boolean, isTo: boolean, usePool: boolean, runNow: boolean): SyncTween {
            // 	this.mContent._create(target, props, duration, ease, complete, delay, coverBefore, isTo, usePool, runNow)
            // 	return this;
            // }
            _this.autoRecover = true;
            _this.mContent = new Laya.Tween();
            _this.completeHandler = Laya.Handler.create(_this, _this.onComplete, null, false);
            return _this;
        }
        Object.defineProperty(SyncTween.prototype, "gid", {
            get: function () {
                return this.mContent.gid;
            },
            set: function (gid) {
                this.mContent.gid = gid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SyncTween.prototype, "update", {
            /**更新回调，缓动数值发生变化时，回调变化的值*/
            get: function () {
                return this.mContent.update;
            },
            set: function (handler) {
                this.mContent.update = handler;
            },
            enumerable: true,
            configurable: true
        });
        SyncTween.create = function () {
            return SyncTween.pool.getItemByClass(SyncTween.sign, SyncTween);
        };
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
        SyncTween.to = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            if (autoRecover === void 0) { autoRecover = true; }
            var tween = SyncTween.create();
            tween.autoRecover = autoRecover;
            return tween.to(target, props, duration, ease, complete, delay, coverBefore);
        };
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
        SyncTween.from = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            if (autoRecover === void 0) { autoRecover = true; }
            var tween = SyncTween.create();
            tween.autoRecover = autoRecover;
            return tween.from(target, props, duration, ease, complete, delay, coverBefore);
        };
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
        SyncTween.prototype.to = function (target, props, duration, ease, complete, delay, coverBefore) {
            if (this.isWaitting()) {
                this.outComplete = complete;
                this.mContent.to(target, props, duration, ease, this.completeHandler, delay, coverBefore);
            }
            else {
                this.setTweenParams(SyncTween.TWEEN_TO, target, props, duration, ease, complete, delay, coverBefore);
            }
            return this;
        };
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
        SyncTween.prototype.from = function (target, props, duration, ease, complete, delay, coverBefore) {
            if (this.isWaitting()) {
                this.outComplete = complete;
                this.mContent.from(target, props, duration, ease, this.completeHandler, delay, coverBefore);
            }
            else {
                this.setTweenParams(SyncTween.TWEEN_FROM, target, props, duration, ease, complete, delay, coverBefore);
            }
            return this;
        };
        Object.defineProperty(SyncTween.prototype, "progress", {
            // _updateEase(time: number): void;
            /**设置当前执行比例**/
            get: function () {
                return this.mContent.progress;
            },
            set: function (p) {
                this.mContent.progress = p;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 立即结束缓动并到终点。
         */
        SyncTween.prototype.complete = function () {
            this.mContent.complete();
        };
        /**
         * 暂停缓动，可以通过resume或restart重新开始。
         */
        SyncTween.prototype.pause = function () {
            this.mContent.pause();
        };
        /**
         * 设置开始时间。
         * @param	startTime 开始时间。
         */
        SyncTween.prototype.setStartTime = function (startTime) {
            this.mContent.setStartTime(startTime);
        };
        /**
         * 清理指定目标对象上的所有缓动。
         * @param	target 目标对象。
         */
        SyncTween.clearAll = function (target) {
            Laya.Tween.clearAll(target);
        };
        /**
         * 清理某个缓动。
         * @param	tween 缓动对象。
         */
        SyncTween.clear = function (tween) {
            Laya.Tween.clear(tween.mContent);
        };
        SyncTween.clearTween = function (target) {
            Laya.Tween.clearTween(target);
        };
        SyncTween.prototype.cancel = function (reason) {
            _super.prototype.cancel.call(this, reason);
            this.clear();
            if (this.autoRecover)
                this.recover();
        };
        /**
         * 停止并清理当前缓动。
         */
        SyncTween.prototype.clear = function () {
            this.mContent.clear();
            if (this.outComplete)
                this.outComplete = null;
            this.props = null;
            this.target = null;
            this.ease = null;
        };
        /**
         * @private
         */
        // _clear(): void;
        /** 回收到对象池。*/
        SyncTween.prototype.recover = function () {
            this.clear();
            this.reset();
            SyncTween.pool.recover(SyncTween.sign, this);
        };
        /**
         * 重新开始暂停的缓动。
         */
        SyncTween.prototype.restart = function () {
            this.mContent.restart();
        };
        /**
         * 恢复暂停的缓动。
         */
        SyncTween.prototype.resume = function () {
            this.mContent.resume();
        };
        SyncTween.prototype.setTweenParams = function (fromOrTo, target, props, duration, ease, complete, delay, coverBefore) {
            this.tweenType = fromOrTo;
            this.target = target;
            this.props = props;
            this.duration = duration;
            this.ease = ease;
            this.outComplete = complete;
            this.delay = delay;
            this.coverBefore = coverBefore;
        };
        SyncTween.prototype.startTask = function () {
            _super.prototype.startTask.call(this);
            this.startTween();
            return this;
        };
        SyncTween.prototype.startTween = function () {
            if (!this.mContent)
                return;
            if (this.tweenType == SyncTween.TWEEN_FROM) {
                this.mContent.from(this.target, this.props, this.duration, this.ease, this.completeHandler, this.delay, this.coverBefore);
            }
            else if (this.tweenType == SyncTween.TWEEN_TO) {
                this.mContent.to(this.target, this.props, this.duration, this.ease, this.completeHandler, this.delay, this.coverBefore);
            }
        };
        SyncTween.prototype.onComplete = function () {
            this.outComplete && this.outComplete.run();
            this.done();
            this.clear();
            if (this.autoRecover)
                this.recover();
        };
        SyncTween.pool = new riggerIOC.Pool();
        SyncTween.TWEEN_FROM = 1;
        SyncTween.TWEEN_TO = 2;
        return SyncTween;
    }(riggerIOC.WaitableTask));
    riggerLayaSA.SyncTween = SyncTween;
})(riggerLayaSA || (riggerLayaSA = {}));
var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, WebGL);
        // this.testTimeLine();
        // this.testTween();
        this.testSyncTween();
    }
    GameMain.prototype.testSyncTween = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sp, singComplete, singCancel, complete, cancel, taskExe, t1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = new Laya.Sprite();
                        sp.graphics.drawCircle(30, 30, 30, "yellow");
                        Laya.stage.addChild(sp);
                        sp.name = "sprite1";
                        singComplete = riggerIOC.Handler.create(this, this.onSingleComplete, null, false);
                        singCancel = riggerIOC.Handler.create(this, this.onSingleCancel, null, false);
                        complete = riggerIOC.Handler.create(this, this.onComplete, null, false);
                        cancel = riggerIOC.Handler.create(this, this.onCancel, null, false);
                        taskExe = new riggerIOC.TaskExecutor();
                        t1 = riggerLayaSA.SyncTween.to(sp, { x: 100 }, 1000);
                        taskExe.setCompleteHandler(complete, null);
                        taskExe.setCancelHandler(cancel, null);
                        // await t1.wait()
                        taskExe.add(riggerLayaSA.SyncTween.to(sp, { x: 100 }, 2000), singComplete, [sp, { x: 100 }], singCancel, [sp, { x: 100 }]);
                        taskExe.add(riggerLayaSA.SyncTween.to(sp, { y: 50 }, 2000), singComplete, [sp, { y: 50 }], singCancel, [sp, { y: 50 }]);
                        // await riggerLayaSA.SyncTween.to(sp, {x: 100}, 1000).wait();
                        // await riggerLayaSA.SyncTween.to(sp, {y: 100}, 1000).wait();
                        setTimeout(this.onInterupt, 1000, taskExe);
                        return [4 /*yield*/, taskExe.executeAsync()];
                    case 1:
                        _a.sent();
                        console.log("tween complete");
                        return [2 /*return*/];
                }
            });
        });
    };
    GameMain.prototype.testTween = function () {
        var sp = new Laya.Sprite();
        sp.graphics.drawCircle(30, 30, 30, "yellow");
        Laya.stage.addChild(sp);
        sp.name = "sprite1";
        Laya.Tween.to(sp, { "x": 100 }, 2000, null, Laya.Handler.create(this, this.onTweenComplete, [1]))
            .to(sp, { "x": 200 }, 2000, null, Laya.Handler.create(this, this.onTweenComplete, [2]));
    };
    GameMain.prototype.testTimeLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cont, singleCompleteH, singleCancelH, sp, t1, sp2, t2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initBtns();
                        cont = new riggerIOC.TaskExecutor();
                        cont.setCompleteHandler(riggerIOC.Handler.create(this, this.onComplete, [cont]));
                        cont.setCancelHandler(riggerIOC.Handler.create(this, this.onCancel, [cont]));
                        singleCompleteH = riggerIOC.Handler.create(this, this.onSingleComplete, null, false);
                        singleCancelH = riggerIOC.Handler.create(this, this.onSingleCancel, null, false);
                        sp = new Laya.Sprite();
                        sp.graphics.drawCircle(30, 30, 30, "yellow");
                        Laya.stage.addChild(sp);
                        sp.name = "sprite1";
                        t1 = new riggerLayaSA.SyncTimeLine();
                        t1.addLabel("userfightZoomIn", 0).to(sp, { "x": 50 }, 500, null, 0)
                            .addLabel("userfightLanding", 0).to(sp, { "x": 100 }, 300, null, 0)
                            .addLabel("pcfightZoomIn", 0).to(sp, { "y": 50 }, 500, null, 0);
                        cont.add(t1.play("userfightZoomIn"), singleCompleteH, [sp], singleCancelH, [sp]);
                        sp2 = new Laya.Sprite();
                        sp2.graphics.drawCircle(130, 130, 30, "red");
                        Laya.stage.addChild(sp2);
                        sp2.name = "sprite2";
                        t2 = new riggerLayaSA.SyncTimeLine();
                        t2.addLabel("userfightZoomIn", 0).to(sp2, { "x": 50 }, 500, null, 0)
                            .addLabel("userfightLanding", 0).to(sp2, { "x": 100 }, 300, null, 0)
                            .addLabel("pcfightZoomIn", 0).to(sp2, { "y": 50 }, 500, null, 0);
                        cont.add(t2.play("userfightZoomIn", false), singleCompleteH, [sp2], singleCancelH, [sp2]);
                        setTimeout(this.onInterupt, 1300, cont);
                        return [4 /*yield*/, cont.execute()];
                    case 1:
                        _a.sent();
                        // await t1.play().wait();
                        // cont.cancel();
                        console.log("play complete");
                        return [2 /*return*/];
                }
            });
        });
    };
    GameMain.prototype.onSingleComplete = function (obj, props, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (props.x !== null && props.x !== undefined) {
            obj.x = props.x;
        }
        if (props.y !== null && props.y !== undefined) {
            obj.y = props.y;
        }
        console.log("[time:" + Laya.Browser.now() + "]task:" + obj.name + " complete");
    };
    GameMain.prototype.onSingleCancel = function (obj, props, reason) {
        if (props.x !== null && props.x !== undefined) {
            obj.x = props.x;
        }
        if (props.y !== null && props.y !== undefined) {
            obj.y = props.y;
        }
        console.log("[time:" + Laya.Browser.now() + "]task:" + obj.name + " canceled, reason:" + reason);
    };
    GameMain.prototype.onComplete = function (cont) {
        console.log("[time:" + Laya.Browser.now() + "]seq exec complete!");
    };
    GameMain.prototype.onCancel = function (cont, reason) {
        console.log("[time:" + Laya.Browser.now() + "]seq exec canceled, reason:" + reason);
    };
    GameMain.prototype.initBtns = function () {
        var cancelBtn = new Laya.Button();
        cancelBtn.label = "取消";
        cancelBtn.mouseEnabled = true;
        Laya.stage.addChild(cancelBtn);
        cancelBtn.x = 150;
        cancelBtn.y = 250;
        cancelBtn.on(Laya.Event.CLICK, this, this.onClickCancel);
    };
    GameMain.prototype.onClickCancel = function () {
        console.log("clicked cancel");
    };
    GameMain.prototype.onInterupt = function (cont) {
        cont.cancel("test");
    };
    GameMain.prototype.onTweenComplete = function (arg) {
        console.log("tween complete:" + arg);
    };
    return GameMain;
}());
new GameMain();
/**
* name
*/
var riggerLayaSA;
(function (riggerLayaSA) {
    var SyncTimeLine = /** @class */ (function (_super) {
        __extends(SyncTimeLine, _super);
        function SyncTimeLine() {
            var _this = _super.call(this, new Laya.TimeLine()) || this;
            _this.startTimeOrLabel = null;
            _this.loop = null;
            return _this;
        }
        Object.defineProperty(SyncTimeLine.prototype, "scale", {
            get: function () {
                return this.mContent.scale;
            },
            set: function (s) {
                this.mContent.scale = s;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
        SyncTimeLine.to = function (target, props, duration, ease, offset) {
            var ret = new SyncTimeLine();
            ret.to(target, props, duration, ease, offset);
            return ret;
        };
        /**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
        SyncTimeLine.from = function (target, props, duration, ease, offset) {
            var ret = new SyncTimeLine();
            ret.from(target, props, duration, ease, offset);
            return ret;
        };
        /**
         * 控制一个对象，从当前点移动到目标点。
         * @param	target		要控制的对象。
         * @param	props		要控制对象的属性。
         * @param	duration	对象TWEEN的时间。
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）。
         */
        SyncTimeLine.prototype.to = function (target, props, duration, ease, offset) {
            this.mContent.to(target, props, duration, ease, offset);
            return this;
        };
        /**
         * 从 props 属性，缓动到当前状态。
         * @param	target		target 目标对象(即将更改属性值的对象)
         * @param	props		要控制对象的属性
         * @param	duration	对象TWEEN的时间
         * @param	ease		缓动类型
         * @param	offset		相对于上一个对象，偏移多长时间（单位：毫秒）
         */
        SyncTimeLine.prototype.from = function (target, props, duration, ease, offset) {
            this.mContent.from(target, props, duration, ease, offset);
            return this;
        };
        /**
         * 在时间队列中加入一个标签。
         * @param	label	标签名称。
         * @param	offset	标签相对于上个动画的偏移时间(单位：毫秒)。
         */
        SyncTimeLine.prototype.addLabel = function (label, offset) {
            this.mContent.addLabel(label, offset);
            return this;
        };
        /**
         * 移除指定的标签
         * @param	label
         */
        SyncTimeLine.prototype.removeLabel = function (label) {
            this.mContent.removeLabel(label);
        };
        /**
         * 动画从整个动画的某一时间开始。
         * @param	time(单位：毫秒)。
         */
        SyncTimeLine.prototype.gotoTime = function (time, immediately) {
            if (immediately === void 0) { immediately = false; }
            return this.play(time, false, immediately);
        };
        /**
         * 从指定的标签开始播。
         * @param	Label 标签名。
         */
        SyncTimeLine.prototype.gotoLabel = function (Label, immediately) {
            if (immediately === void 0) { immediately = false; }
            return this.play(Label, false, immediately);
        };
        /**
         * 暂停整个动画。
         */
        SyncTimeLine.prototype.pause = function () {
            this.mContent.pause();
        };
        /**
         * 恢复暂停动画的播放。
         */
        SyncTimeLine.prototype.resume = function () {
            this.mContent.resume();
        };
        /**
         * 播放动画。
         * @param	timeOrLabel 开启播放的时间点或标签名。
         * @param	loop 是否循环播放。
         * @param	immediately 是否立即开始播放，默认为false,如果为false，则要在wait后才会开始播放
         *
         */
        SyncTimeLine.prototype.play = function (timeOrLabel, loop, immediately) {
            if (immediately === void 0) { immediately = false; }
            if (!this.mContent)
                return;
            this.startTimeOrLabel = timeOrLabel;
            this.loop = loop;
            if (immediately) {
                this.doPlay();
            }
            return this;
        };
        SyncTimeLine.prototype.cancel = function (reason) {
            if (!this.mContent)
                return;
            this.mContent.pause();
            _super.prototype.cancel.call(this, reason);
        };
        Object.defineProperty(SyncTimeLine.prototype, "index", {
            /**
             * @private
             * 得到帧索引
             */
            get: function () {
                return this.mContent.index;
            },
            /**
             * @private
             * 设置帧索引
             */
            set: function (idx) {
                this.mContent.index = idx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SyncTimeLine.prototype, "total", {
            /**
             * 得到总帧数。
             */
            get: function () {
                return this.mContent.total;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 重置所有对象，复用对象的时候使用。
         */
        SyncTimeLine.prototype.reset = function () {
            this.mContent.reset();
            _super.prototype.reset.call(this);
            return this;
        };
        /**
         * 彻底销毁此对象。
         */
        SyncTimeLine.prototype.destroy = function () {
            this.dispose();
        };
        SyncTimeLine.prototype.dispose = function () {
            this.mContent.offAll();
            this.mContent.destroy();
            this.mContent = null;
            _super.prototype.dispose.call(this);
        };
        SyncTimeLine.prototype.startTask = function () {
            _super.prototype.startTask.call(this);
            this.doPlay();
            return this;
        };
        SyncTimeLine.prototype.onComplete = function () {
            this.done();
        };
        SyncTimeLine.prototype.onLabel = function () {
        };
        SyncTimeLine.prototype.doPlay = function () {
            if (!this.mContent.hasListener(Laya.Event.COMPLETE)) {
                this.mContent.once(Laya.Event.COMPLETE, this, this.onComplete);
            }
            this.mContent.play(this.startTimeOrLabel, this.loop);
            this.startTimeOrLabel = this.loop = null;
        };
        SyncTimeLine.prototype.isLabel = function (timeOrLabel) {
            if (typeof timeOrLabel === "string") {
                return true;
            }
            return false;
        };
        return SyncTimeLine;
    }(riggerIOC.WaitableTask));
    riggerLayaSA.SyncTimeLine = SyncTimeLine;
})(riggerLayaSA || (riggerLayaSA = {}));
//# sourceMappingURL=game.js.map