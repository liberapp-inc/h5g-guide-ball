class Obstacle extends GameObject
{
    public lines : SimpleLine[] = new Array(4);

    constructor( x:number, y:number, w:number, h:number )
    {
        super();
        
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0x000000);
        this.shape.graphics.drawRect( 0, 0, w, h );
        this.shape.graphics.endFill();

        GameObject.gameDisplay.addChild( this.shape );

        this.lines[0] = new SimpleLine( x, y, x+w, y );
        this.lines[1] = new SimpleLine( x+w, y, x+w, y+h );
        this.lines[2] = new SimpleLine( x+w, y+h, x, y+h );
        this.lines[3] = new SimpleLine( x, y+h, x, y );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    updateContent(){}
}

class SimpleLine
{
    public startPos : egret.Point;
    public endPos : egret.Point;

    constructor( x1:number, y1:number, x2:number, y2:number )
    {
        this.startPos = new egret.Point( x1, y1 );
        this.endPos = new egret.Point( x2, y2 );
    }
}
