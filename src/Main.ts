class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        this.stage.frameRate = 60;
        GameObject.initial( this.stage );
        Util.init(this);
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        GameObject.update();
        return false;
    }

}

class Game
{
    public static height: number;
    public static width: number;
    public static deltaTime: number;

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        this.deltaTime = 1 / egret.MainContext.instance.stage.frameRate;

        /* new メソッドを記入*/
        new Background();
        new Score();
        new GameManager();
    }
}


class Background extends GameObject{

    constructor() {
        super();

        this.shape = new egret.Shape();
        //this.shape.graphics.beginFill(Util.color(5,55,155));
        this.shape.graphics.beginFill(0x808080);
        this.shape.graphics.drawRect(0, 0, Game.width, Game.height);
        this.shape.graphics.endFill();
        GameObject.gameDisplay.addChild(this.shape);
    }
    
    updateContent() {}

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }
}

/*
class CreateWorld extends PhysicsObject{

    static I : CreateWorld = null;

    constructor() {
        super();
        CreateWorld.I = this;
        CreateWorld.world.on("beginContact",  this.collision, this);

    }
    createWorld(){
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];

    }

    static worldBegin(dt : number) :boolean{
       
        CreateWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

    //コリジョンイベントはここにまとめる
    private collision(evt : any){

    }

    addDestroyMethod(){CreateWorld.world.clear();}

    updateContent(){}


}*/
