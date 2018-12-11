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
var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, WebGL);
        this.testTimeLine();
    }
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
    GameMain.prototype.onSingleComplete = function (obj) {
        obj.x = 100;
        obj.y = 50;
        console.log("[time:" + Laya.Browser.now() + "]task:" + obj.name + " complete");
    };
    GameMain.prototype.onSingleCancel = function (obj, reason) {
        obj.x = 100;
        obj.y = 50;
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
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=game.js.map