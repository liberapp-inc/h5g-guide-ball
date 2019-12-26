class Effect extends GameObject
{
    public isDisable : boolean;
    private radius : number;
    private color : number;

    constructor( /*x:number, y:number, col:number*/ )
    {
        super();
        this.isDisable = false;
        this.color = 0x000000;
        this.radius = 12;
        this.setShape( 0, 0, this.radius );
    }

    activate( x:number, y:number, col:number )
    {
        this.isDisable = false;
        this.color = col;
        this.radius = 12;

        this.shape.x = x;
        this.shape.y = y;
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x:number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.lineStyle( 1, this.color );
        this.shape.graphics.drawCircle( 0, 0, size );

        GameObject.gameDisplay.addChild( this.shape );
    }


    updateContent()
    {
        if( GameManager.I.pause ){
            return;
        }

        this.radius += 120 * Game.deltaTime;
        this.shape.graphics.clear();
        this.shape.graphics.lineStyle( 1, this.color );
        this.shape.graphics.drawCircle( 0, 0, this.radius );

        if( this.radius > 50 ){
            this.disable();
        }
    }

    disable()
    {
        this.isDisable = true;
        this.shape.graphics.clear();
    }
}
