
const END_LEVEL : number = 4;
const GEN_YOFS : number = 150;

class BallGenerator extends GameObject
{
    //static I : BallGenerator = null;   // singleton instance
    public timer : egret.Timer = null;
    //public waitTimer : egret.Timer = null;
    private textCntr : egret.TextField = null;
    private reqGen : number = 0;
    private stepFunc : ()=>void = null;
    private rot : number;
    private speed : number;
    private counter : number;

    constructor() {
        super();

        //BallGenerator.I = this;

        this.textCntr = Util.myText(200, 200-30*2, "100", 50, 0.5, 0xc0c0c0, false, true);        
        GameObject.uiDisplay.addChild( this.textCntr );

        //this.waitTimer = new egret.Timer(1000, 0);

        this.setShape( 200, 200, 30 );
        this.rot = Math.PI*0.75;
        this.speed = 300;
        this.counter = 100;

        // test
        this.start();
    }

    setShape( x: number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 2, 0xffffff );
        this.shape.graphics.drawCircle(0, 0, size);
        //this.shape.graphics.beginFill(0xf0f0f0);
        //this.shape.graphics.drawCircle(0, 0, size);
        //this.shape.graphics.endFill();

        GameObject.gameDisplay.addChild( this.shape );
    }


    public start()
    {
        this.timer = new egret.Timer( 200, this.counter );    // 生成間隔.
        this.timer.addEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        this.timer.addEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );

        this.timer.start();
    }

    onDestroy()
    {
        GameObject.gameDisplay.removeChild( this.shape );
        GameObject.uiDisplay.removeChild( this.textCntr );
        this.textCntr = null;
        this.timer.removeEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        this.timer.removeEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );
        this.timer = null;
        //this.waitTimer = null;
        //BallGenerator.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        this.reqGen = 1;
        this.stepFunc = this.generate;
    }

    private timerComplete(event: egret.Event)
    {
    }

    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        if( this.stepFunc != null ){
            this.stepFunc();
        }
    }

    generate()
    {
        if( this.reqGen > 0 ){
            // 向き、速度ベクトル.
            let mat = new egret.Matrix();
            mat.rotate( this.rot );
            let dir = new egret.Point();
            mat.transformPoint( 0, -1, dir );

            let startPos = new egret.Point();
            startPos.x = this.shape.x;
            startPos.y = this.shape.y;
            for( let i = 0; i < this.reqGen; i++ ){
                let ball = BallManager.I.requestBall();
                ball.activate( startPos.x, startPos.y, dir, this.speed );
            }
            this.reqGen = 0;
            this.counter--;
            this.textCntr.text = this.counter.toString();
            // センタリングし直す.
            this.textCntr.anchorOffsetX = 0.5*this.textCntr.width;
        }

        this.stepFunc = null;
    }
}
