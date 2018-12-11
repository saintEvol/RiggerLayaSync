import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    constructor() {
        Laya.init(600, 400, WebGL);
        this.testTimeLine();
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

        let t1: riggerLayaSA.SyncTimeLine = new riggerLayaSA.SyncTimeLine();
        t1.addLabel("userfightZoomIn", 0).to(sp, { "x": 50 }, 500, null, 0)
            .addLabel("userfightLanding", 0).to(sp, { "x": 100 }, 300, null, 0)
            .addLabel("pcfightZoomIn", 0).to(sp, { "y": 50 }, 500, null, 0)

        cont.add(t1.play("userfightZoomIn"), singleCompleteH, [sp], singleCancelH, [sp]);

        let sp2: Laya.Sprite = new Laya.Sprite();
        sp2.graphics.drawCircle(130, 130, 30, "red");
        Laya.stage.addChild(sp2);

        sp2.name = "sprite2"
        let t2: riggerLayaSA.SyncTimeLine = new riggerLayaSA.SyncTimeLine();
        t2.addLabel("userfightZoomIn", 0).to(sp2, { "x": 50 }, 500, null, 0)
            .addLabel("userfightLanding", 0).to(sp2, { "x": 100 }, 300, null, 0)
            .addLabel("pcfightZoomIn", 0).to(sp2, { "y": 50 }, 500, null, 0)

        cont.add(t2.play("userfightZoomIn", false), singleCompleteH, [sp2], singleCancelH, [sp2]);

        setTimeout(this.onInterupt, 1300, cont)
        await cont.execute();
        // await t1.play().wait();
        // cont.cancel();
        console.log("play complete")
    }

    private onSingleComplete(obj: Laya.Sprite) {
        obj.x = 100;
        obj.y = 50
        console.log(`[time:${Laya.Browser.now()}]task:${obj.name} complete`);
    }

    private onSingleCancel(obj: Laya.Sprite, reason: any) {
         obj.x = 100;
        obj.y = 50
        console.log(`[time:${Laya.Browser.now()}]task:${obj.name} canceled, reason:${reason}`);

    }

    private onComplete(cont: riggerIOC.TaskExecutor) {
        console.log(`[time:${Laya.Browser.now()}]seq exec complete!`);

    }

    private onCancel(cont: riggerIOC.TaskExecutor, reason: any) {
        console.log(`[time:${Laya.Browser.now()}]seq exec canceled, reason:${reason}`);

    }

    private initBtns(){
        let cancelBtn: Laya.Button = new Laya.Button();
        cancelBtn.label = "取消";
        cancelBtn.mouseEnabled = true;
        Laya.stage.addChild(cancelBtn);
        cancelBtn.x = 150;
        cancelBtn.y = 250;

        cancelBtn.on(Laya.Event.CLICK, this, this.onClickCancel);
    }

    private onClickCancel(){
        console.log("clicked cancel");
        
    }

    private onInterupt(cont: riggerIOC.TaskExecutor){
        cont.cancel("test")
    }

}
new GameMain();