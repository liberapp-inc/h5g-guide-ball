
const END_LEVEL : number = 4;
const GEN_YOFS : number = 150;

class BallGenerator extends GameObject
{
    static I : BallGenerator = null;   // singleton instance
    public timer : egret.Timer = null;
    public waitTimer : egret.Timer = null;
    private textLevel : egret.TextField = null;
    private reqGen : number = 0;
    private wave : number = 0;
    private level : number = 0;
    private stepFunc : ()=>void = null;
    private rot : number;
    private labelWave : SimpleText = null;

    constructor() {
        super();

        BallGenerator.I = this;

//        this.textLevel = Util.myText(30, 40, "Level 1", 60, 0.5, 0xc0c0c0, true, false);        
//        GameObject.uiDisplay.addChild( this.textLevel );

        this.waitTimer = new egret.Timer(1000, 0);

        this.setShape( 200, 200, 30 );
        this.rot = Math.PI*0.75;

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

        GameObject.gameDisplay.addChild( this.shape );
    }



    public start()
    {
        this.timer = new egret.Timer( 500 );
        this.timer.addEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        //this.timer.addEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );

        this.timer.start();
    }

    onDestroy()
    {
        GameObject.gameDisplay.removeChild( this.shape );
        GameObject.uiDisplay.removeChild( this.textLevel );
        this.textLevel = null;
        this.timer.removeEventListener( egret.TimerEvent.TIMER, this.timerFunc, this );
        //this.timer.removeEventListener( egret.TimerEvent.TIMER_COMPLETE, this.timerComplete, this );
        this.timer = null;
        this.waitTimer = null;
        BallGenerator.I = null;
    }


    private timerFunc(event: egret.Event)
    {
        this.reqGen = 1;//this.getGenNum( this.wave );
        this.stepFunc = this.generate;
    }

    /*private timerComplete(event: egret.Event)
    {
        this.wave++;
        this.stepFunc = this.genAndWait;
    }*/

    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        if( this.stepFunc != null ){
            this.stepFunc();
        }
    }
/*
    getGenNum( wave:number ) : number
    {
        if( wave == 0 ){
            //return 1;
            return Util.randomInt(1, 2);
        }
        else if( wave == 1 ){
            return 2;
        }
        else{
            return 3;
            //return Util.randomInt(2, 3);
        }
    }

    getRepeatCount( wave:number ) : number
    {
        if( wave == 1 ){
            return 5;
        }
        else if( wave == 2 ){
            return 9;
        }
        else{
            return 5;
        }
    }

    getSpeed( level:number ) : number
    {
        switch( level ){
        case 0:
            return Util.random( 110, 220 );
        case 1:
            return Util.random( 120, 240 );
        case 2:
            return Util.random( 130, 260 );
        case 3:
        default:
            return Util.random( 150, 300 );
        }
    }

    getDelay( level:number ) : number
    {
        switch( level ){
        case 0:
            return 2500;
        case 1:
            return 2300;
        case 2:
            return 2100;
        case 3:
            return 1900;
        default:
            return 1500;
        }
    }

    getRot( level:number ) : number
    {
        switch( level ){
        case 0:
            return Math.PI;
        case 1:
            return 0;
        case 2:
            if( Util.random(1,100) < 50 ){
                return Math.PI;
            }
            else{
                return 0;                
            }
        case 3:
            if( Util.random(1,100) < 50 ){
                return Math.PI*1.25;
            }
            else{
                return Math.PI;                
            }
        default:
            return 0;
        }
    }
*/
    generate()
    {
        if( this.reqGen > 0 ){
            // 向き、速度ベクトル.
            let mat = new egret.Matrix();
            mat.rotate( this.rot );
            let vel = new egret.Point();
            mat.transformPoint( 0, -1, vel );

            let startPos = new egret.Point();
            startPos.x = this.shape.x;
            startPos.y = this.shape.y;
            for( let i = 0; i < this.reqGen; i++ ){
//                new BallBase( startPos.x, startPos.y, vel, 300 );
                let ball = BallManager.I.requestBall();
                //if( ball != null ){
                    ball.activate( startPos.x, startPos.y, vel, 300 );
                //}
            }
            this.reqGen = 0;
        }

        this.stepFunc = null;
    }
/*
    genAndWait()
    {
        this.generate();

        this.stepFunc = this.waitWave;
        this.waitTimer.reset();
        this.waitTimer.start();
    }

    waitWave()
    {
        if( this.waitTimer.currentCount >= 3 ){
            this.stepFunc = null;

            if( this.wave >= 3 ){
                // 次のレベル.
                this.wave = 0;
                this.level++;
                if( this.level < END_LEVEL ){
                    this.timer.reset();
                    this.timer.delay = this.getDelay( this.level );
                    this.timer.repeatCount = this.getRepeatCount(0);
                    this.timer.start();
                    //this.textName.text = "LEVEL : " + (this.level+1).toString() + "\nWAVE : " + (this.wave+1).toString();
                    new SimpleText("Level : "+(this.level+1).toString(), Game.width/2, Game.height/2 - 360, 48, 0xffff00, true, true, 3 );
                    new SimpleText("Wave : "+(this.wave+1).toString(), Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );
               }
                else{
                    // clear
                    GameManager.I.pause = true;
                    new GameOver( true );
                }
            }
            else{
                // 次のwave.
                this.timer.reset();
                this.timer.delay = this.getDelay( this.level );
                this.timer.repeatCount = this.getRepeatCount( this.wave );
                this.timer.start();
                //this.textName.text = "LEVEL : " + (this.level+1).toString() + "\nWAVE : " + (this.wave+1).toString();
                new SimpleText("Wave : "+(this.wave+1).toString(), Game.width/2, Game.height/2 - 300, 40, 0xffff00, true, true, 3 );
            }

            this.textLevel.text = "Level " + (this.level+1).toString() + "\nWave " + (this.wave+1).toString();
        }
    }
    */
}
