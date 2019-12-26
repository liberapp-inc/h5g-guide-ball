const TAR_COLOR : number = 0xe00000;

class Target extends GameObject
{
    static I : Target = null;
    private life : number;
    private text : egret.TextField = null;
    public pos : egret.Point;
    public radius : number;

    constructor( /*x:number, y:number, vel:egret.Point, speed:number*/ )
    {
        super();
        Target.I = this;

        this.life = 30;

        this.radius = 50;
        this.pos = new egret.Point( 400, 600 );
        this.setShape( this.pos.x, this.pos.y, this.radius );

        this.text = Util.myText( this.pos.x, this.pos.y, this.life.toString(), 50, 0.5, 0xc0c0c0, false, true );
        GameObject.uiDisplay.addChild( this.text );
    }

    onDestroy()
    {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;

        GameObject.uiDisplay.removeChild( this.text );
        this.text = null;

        Target.I = null;
    }

    setShape( x: number, y:number, rad: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild( this.shape );        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill( TAR_COLOR );
        this.shape.graphics.drawCircle( 0, 0, rad );
        this.shape.graphics.endFill();
        GameObject.gameDisplay.addChild( this.shape );
    }

    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }
    }

    delLife()
    {
        this.life--;
        if( this.life <= 0 ){
            this.life = 0;

            // クリア処理.
            GameManager.I.pause = true;
            GameObject.transit = Game.init;
        }
        this.text.text = this.life.toString();
        // センタリングし直す.
        this.text.anchorOffsetX = 0.5*this.text.width;
    }
}
