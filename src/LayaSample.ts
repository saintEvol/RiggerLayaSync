import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    constructor() {
        Laya.init(600, 400, WebGL);
        this.testTimeLine();
        // this.testTween();
        // this.testSyncTween();
    }

    async testSyncTween() {
        let sp: Laya.Sprite = new Laya.Sprite();
        sp.graphics.drawCircle(30, 30, 30, "yellow");
        Laya.stage.addChild(sp);
        sp.name = "sprite1"
        let singComplete = riggerIOC.Handler.create(this, this.onSingleComplete, null, false);
        let singCancel = riggerIOC.Handler.create(this, this.onSingleCancel, null, false);
        let complete = riggerIOC.Handler.create(this, this.onComplete, null, false);
        let cancel = riggerIOC.Handler.create(this, this.onCancel, null, false);

        let taskExe: riggerIOC.TaskExecutor = new riggerIOC.TaskExecutor();
        let t1: riggerLayaSync.SyncTween = riggerLayaSync.SyncTween.to(sp, { x: 100 }, 1000);
        taskExe.setCompleteHandler(complete, null);
        taskExe.setCancelHandler(cancel, null);
        // await t1.wait()
        taskExe.add(riggerLayaSync.SyncTween.to(sp, { x: 100 }, 2000), singComplete, [sp, { x: 100 }], singCancel, [sp, { x: 100 }]);
        taskExe.add(riggerLayaSync.SyncTween.to(sp, { y: 50 }, 2000), singComplete, [sp, { y: 50 }], singCancel, [sp, { y: 50 }]);
        // await riggerLayaSA.SyncTween.to(sp, {x: 100}, 1000).wait();
        // await riggerLayaSA.SyncTween.to(sp, {y: 100}, 1000).wait();

        setTimeout(this.onInterupt, 1000, taskExe);
        await taskExe.executeAsync();
        console.log("tween complete");

    }

    testTween() {
        let sp: Laya.Sprite = new Laya.Sprite();
        sp.graphics.drawCircle(30, 30, 30, "yellow");
        Laya.stage.addChild(sp);
        sp.name = "sprite1"

        Laya.Tween.to(sp, { "x": 100 }, 2000, null, Laya.Handler.create(this, this.onTweenComplete, [1]))
            .to(sp, { "x": 200 }, 2000, null, Laya.Handler.create(this, this.onTweenComplete, [2]));

    }

    async testTimeLine() {
        this.initBtns();

        let cont: riggerIOC.TaskExecutor = new riggerIOC.TaskExecutor();
        cont.setCompleteHandler(riggerIOC.Handler.create(this, this.onComplete, [cont]));
        cont.setCancelHandler(riggerIOC.Handler.create(this, this.onCancel, [cont]));
        let singleCompleteH = riggerIOC.Handler.create(this, this.onSingleComplete, null, false);
        let singleCancelH = riggerIOC.Handler.create(this, this.onSingleCancel, null, false)

        let sp: Laya.Sprite = new Laya.Sprite();
        sp.graphics.drawCircle(30, 30, 30, "yellow");
        Laya.stage.addChild(sp);
        sp.name = "sprite1"

        let t1: riggerLayaSync.SyncTimeLine = riggerLayaSync.SyncTimeLine.create();
        t1.addLabel("userfightZoomIn", 0).to(sp, { "x": 50 }, 500, null, 0)
            .addLabel("userfightLanding", 0).to(sp, { "x": 100 }, 300, null, 0)
            .addLabel("pcfightZoomIn", 0).to(sp, { "y": 50 }, 500, null, 0)

        cont.add(t1.play("userfightZoomIn"), singleCompleteH, [sp], singleCancelH, [sp]);

        let sp2: Laya.Sprite = new Laya.Sprite();
        sp2.graphics.drawCircle(130, 130, 30, "red");
        Laya.stage.addChild(sp2);

        sp2.name = "sprite2"
        let t2: riggerLayaSync.SyncTimeLine = riggerLayaSync.SyncTimeLine.create();
        t2.addLabel("userfightZoomIn", 0).to(sp2, { "x": 50 }, 500, null, 0)
            .addLabel("userfightLanding", 0).to(sp2, { "x": 100 }, 300, null, 0)
            .addLabel("pcfightZoomIn", 0).to(sp2, { "y": 50 }, 500, null, 0)

        cont.add(t2.play("userfightZoomIn", false), singleCompleteH, [sp2], singleCancelH, [sp2]);

        // setTimeout(this.onInterupt, 1300, cont)
        await cont.execute();
        t1.recover();
        t2.recover();
        // await t1.play().wait();
        // cont.cancel();
        console.log("play complete")
    }

    private onSingleComplete(obj: Laya.Sprite, props: any) {
        if (props) {
            if (props.x !== null && props.x !== undefined) {
                obj.x = props.x;
            }

            if (props.y !== null && props.y !== undefined) {
                obj.y = props.y;
            }
        }

        console.log(`[time:${Laya.Browser.now()}]task:${obj.name} complete`);
    }

    private onSingleCancel(obj: Laya.Sprite, props: any, reason: any) {
        if (props) {
            if (props.x !== null && props.x !== undefined) {
                obj.x = props.x;
            }

            if (props.y !== null && props.y !== undefined) {
                obj.y = props.y;
            }
        }

        console.log(`[time:${Laya.Browser.now()}]task:${obj.name} canceled, reason:${reason}`);

    }

    private onComplete(cont: riggerIOC.TaskExecutor) {
        console.log(`[time:${Laya.Browser.now()}]seq exec complete!`);

    }

    private onCancel(cont: riggerIOC.TaskExecutor, reason: any) {
        console.log(`[time:${Laya.Browser.now()}]seq exec canceled, reason:${reason}`);

    }

    private initBtns() {
        let cancelBtn: Laya.Button = new Laya.Button();
        cancelBtn.label = "取消";
        cancelBtn.mouseEnabled = true;
        Laya.stage.addChild(cancelBtn);
        cancelBtn.x = 150;
        cancelBtn.y = 250;

        cancelBtn.on(Laya.Event.CLICK, this, this.onClickCancel);
    }

    private onClickCancel() {
        console.log("clicked cancel");

    }

    private onInterupt(cont: riggerIOC.TaskExecutor) {
        cont.cancel("test")
    }

    private onTweenComplete(arg) {
        console.log(`tween complete:${arg}`);

    }

}
new GameMain();