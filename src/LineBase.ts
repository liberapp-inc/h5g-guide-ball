
const LINE_COL = 0x00f080;

class LineBase extends GameObject
{
    private startPos : egret.Point;
    private endPos : egret.Point;

    constructor( start:egret.Point, end:egret.Point )
    {
        super();

        this.startPos = new egret.Point( start.x, start.y );
        this.endPos = new egret.Point( end.x, end.y );

        this.shape = new egret.Shape();
        this.shape.graphics.lineStyle( 4, LINE_COL );
        this.shape.graphics.moveTo( this.startPos.x, this.startPos.y );
        this.shape.graphics.lineTo( this.endPos.x, this.endPos.y );
        GameObject.gameDisplay.addChild( this.shape );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }
    
    updateContent(){}
}
