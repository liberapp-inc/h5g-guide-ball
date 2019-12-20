const BALL_COLOR : number = 0xf0f0ff;
const BALL_RADIUS : number = 8;

class BallBase extends GameObject
{
    public isDisable : boolean;
    private radius : number;
    private velocity : egret.Point;
    private speed : number;
    private rotSpeed : number;
    private dist : number;
    private type : number;  // 0:障害物 1:回復

    // todo 引数なしにする
    constructor( /*x:number, y:number, vel:egret.Point, speed:number*/ )
    {
        super();

        this.isDisable = false;
        this.dist = 0;
        //this.speed = speed * Game.deltaTime;

        this.velocity = new egret.Point( /*vel.x, vel.y*/ );
        //this.velocity.x *= this.speed;
        //this.velocity.y *= this.speed;

        this.setShape( 0, 0, BALL_RADIUS );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x: number, y:number, size: number )
    {
        if( this.shape ){
            GameObject.gameDisplay.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(BALL_COLOR);
        this.shape.graphics.drawCircle(0, 0, BALL_RADIUS);
        this.shape.graphics.endFill();

        /*this.shape.graphics.lineStyle(8,0xf00000);
        this.shape.graphics.moveTo( x+100, y+200);
        this.shape.graphics.lineTo( x, y );*/

        GameObject.gameDisplay.addChild( this.shape );
    }

    activate( x:number, y:number, vel:egret.Point, speed:number )
    {
        this.isDisable = false;
        this.shape.x = x;
        this.shape.y = y;
        this.dist = 0;
        this.speed = speed * Game.deltaTime;
        
        this.velocity.setTo( vel.x, vel.y );
        this.velocity.x *= this.speed;
        this.velocity.y *= this.speed;

        this.shape.graphics.beginFill(BALL_COLOR);
        this.shape.graphics.drawCircle(0, 0, BALL_RADIUS);
        this.shape.graphics.endFill();
    }

    updateContent()
    {
        if( this.isDisable ){
            return;
        }
        if( GameManager.I.pause ){
            return;
        }

        let pos = new egret.Point( this.shape.x, this.shape.y );
        let next = pos.add( this.velocity );

        /*if( this.checkColli( pos, next ) ){
            this.destroy();
            return;
        }*/

        this.shape.x = next.x;
        this.shape.y = next.y;
        
        this.dist += this.speed;
        if( this.dist > 1000 ){
            //this.destroy();
            this.isDisable = true;
            this.shape.graphics.clear();
        }

    }

    // PCとの当たり判定.
    // 参考 http://sampo.hatenadiary.jp/entry/20070626/p1#f1
    /*checkColli( pos:egret.Point, nxt:egret.Point ) : boolean
    {
        // 範囲チェック.
        if( (pos.x < Orbit.AreaMinX || pos.x > Orbit.AreaMaxX) &&
            (nxt.x < Orbit.AreaMinX || nxt.x > Orbit.AreaMaxX) ){
            return false;
        }
        if( (pos.y < Orbit.AreaMinY || pos.y > Orbit.AreaMaxY) &&
            (nxt.y < Orbit.AreaMinY || nxt.y > Orbit.AreaMaxY) ){
            return false;
        }

        // 点と線分の距離で判定.
        // pc位置.
        let pcPos = Player.I.pos;

        // pcPosから線分に最も近い点.
        let near = new egret.Point();

        let a = nxt.subtract( pos );
        let b = pcPos.subtract( pos );
        let t = (a.x*b.x + a.y*b.y) / (a.x*a.x + a.y*a.y);

        if( t <= 0 ){
            near = pos;
        }
        else if( t >= 1 ){
            near = nxt;
        }
        else{
            near.x = pos.x + t * a.x;
            near.y = pos.y + t * a.y;
        }

        // pcPosからnearまでの距離.
        //let dist = egret.Point.distance( pcPos, near );
        let distSq = (near.x - pcPos.x)**2 + (near.y - pcPos.y)**2;
        let rSq = (16+10)**2;

        if( distSq <= rSq ){
            //egret.log("hit");
            return true;
        }

        return false;
    }*/

}
