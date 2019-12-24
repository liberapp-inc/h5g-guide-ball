
const LINE_COL = 0x00ff00;

class LineBase extends GameObject
{
    public startPos : egret.Point;
    public endPos : egret.Point;
    public dir : egret.Point;
    public normals : egret.Point[] = new Array(2);

    constructor( start:egret.Point, end:egret.Point )
    {
        super();

        this.startPos = new egret.Point( start.x, start.y );
        this.endPos = new egret.Point( end.x, end.y );

        this.dir = end.subtract( start );
        this.dir.normalize(1);

        // 法線.
        let mat = new egret.Matrix();
        mat.rotate( Math.PI/2 );
        this.normals[0] = new egret.Point();
        mat.transformPoint( this.dir.x, this.dir.y, this.normals[0] );

        this.normals[1] = new egret.Point( -this.normals[0].x, -this.normals[0].y );

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
