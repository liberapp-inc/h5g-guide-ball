
const DRAW_COL = 0x00c040;

enum MyTouchStatus{
    None,
    Start,
    Move,
    End
}

class DrawManager extends GameObject
{
    static I : DrawManager = null;   // singleton instance
    private startPos : egret.Point;
    private endPos : egret.Point;
    public lineLen : number = 0;
    public lineRemain : number = 640;
    private touchStatus : MyTouchStatus;
    private stepFunc : ()=>void = null;
    private circles : egret.Shape[] = new Array(2);
    private drawDisable : boolean = false;

    constructor()
    {
        super();
        DrawManager.I = this;

        this.startPos = new egret.Point();
        this.endPos = new egret.Point();
        
        this.touchStatus = MyTouchStatus.None;

        GameObject.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
        GameObject.display.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
        GameObject.display.addEventListener( egret.TouchEvent.TOUCH_END, this.touchHandler, this );

        this.shape = new egret.Shape();
        GameObject.gameDisplay.addChild( this.shape );

        for( let i = 0; i < 2; i++ ){
            this.circles[i] = new egret.Shape();
            GameObject.gameDisplay.addChild( this.circles[i] );
        }
    }

    onDestroy()
    {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;

        GameObject.gameDisplay.removeChild( this.circles[0] );
        this.circles[0] = null;
        GameObject.gameDisplay.removeChild( this.circles[1] );
        this.circles[1] = null;

        DrawManager.I = null;
    }


    private touchHandler( evt:egret.TouchEvent )
    {
        if( this.drawDisable ){
            return;
        }
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_MOVE:
                //console.log("touch move");
                this.endPos.x = evt.stageX;
                this.endPos.y = evt.stageY;
                this.touchStatus = MyTouchStatus.Move;
                this.stepFunc = this.touchMove;
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                //egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                //egret.MainContext.instance.stage.once( egret.TouchEvent.TOUCH_END, this.touchHandler, this );
                //console.log("touch begin");
                this.stepFunc = this.touchStart;
                this.startPos.x = evt.stageX;
                this.startPos.y = evt.stageY;
                this.endPos.x = evt.stageX;
                this.endPos.y = evt.stageY;
                //egret.log( "st "+ evt.stageX + ", " + evt.stageY );
                this.touchStatus = MyTouchStatus.Start;
                break;
            case egret. TouchEvent.TOUCH_END:
                //egret.MainContext.instance.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                //egret.MainContext.instance.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
                //console.log("touch end");
                this.stepFunc = this.touchEnd;
                this.touchStatus = MyTouchStatus.End;

                //egret.log( "ed " + evt.stageX + ", " + evt.stageY );
                break;
        }
    }

    updateContent()
    {
        if( this.stepFunc != null ){
            this.stepFunc();
        }
    }

    touchStart()
    {
        this.shape.graphics.clear();
        this.circles[0].graphics.clear();
        this.circles[1].graphics.clear();
        
        this.circles[0].x = this.startPos.x;
        this.circles[0].y = this.startPos.y;
        this.circles[0].graphics.lineStyle( 2, 0xffffff );
        this.circles[0].graphics.drawCircle( 0, 0, 8 );

        this.stepFunc = null;
    }

    touchMove()
    {
        // 長さ.
        let vec = this.endPos.subtract( this.startPos );
        let dist = vec.length;        

        if( dist > this.lineRemain ){
            vec.normalize(this.lineRemain);
            this.endPos = vec.add( this.startPos );
        }

        this.shape.graphics.clear();
        this.shape.graphics.lineStyle( 8, DRAW_COL );
        this.shape.graphics.moveTo( this.startPos.x, this.startPos.y );
        this.shape.graphics.lineTo( this.endPos.x, this.endPos.y );

        this.circles[1].graphics.clear();
        this.circles[1].x = this.endPos.x;
        this.circles[1].y = this.endPos.y;
        this.circles[1].graphics.lineStyle( 2, 0xffffff );
        this.circles[1].graphics.drawCircle( 0, 0, 8 );

        this.stepFunc = null;
    }

    touchEnd()
    {
        this.shape.graphics.clear();
        this.circles[0].graphics.clear();
        this.circles[1].graphics.clear();

        let lenSq = (this.endPos.x - this.startPos.x)**2 + (this.endPos.y - this.startPos.y)**2;
        if( lenSq > 400 ){
            this.lineLen += Math.sqrt( lenSq );
            this.lineRemain = 640 - this.lineLen;
            if( this.lineRemain < 20 ){
                this.drawDisable = true;
            }
            if( this.lineRemain < 0 ){
                this.lineRemain = 0;
            }

            new LineBase( this.startPos, this.endPos );
        }

        this.stepFunc = null;
    }
}
