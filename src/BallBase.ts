const BALL_COLOR : number = 0x000080;
const BALL_RADIUS : number = 8;

class BallBase extends GameObject
{
    public isDisable : boolean;
    private radius : number;
    private velocity : egret.Point;
    private speed : number;
    private dir : egret.Point;
    private rotSpeed : number;
    private dist : number;

    constructor()
    {
        super();

        this.isDisable = false;
        this.dist = 0;

        this.velocity = new egret.Point();
        this.dir = new egret.Point();

        this.setShape( 0, 0 );
    }

    onDestroy() {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;
    }

    setShape( x: number, y:number )
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

        GameObject.gameDisplay.addChild( this.shape );
    }

    activate( x:number, y:number, dir:egret.Point, speed:number )
    {
        this.isDisable = false;
        this.shape.x = x;
        this.shape.y = y;
        this.dist = 0;
        this.speed = speed * Game.deltaTime;

        this.dir = dir;
        
        this.velocity.setTo( dir.x, dir.y );
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

        // 範囲チェック.
        if( pos.x < 0 || pos.x > Game.width ){
            this.disable();
            return;
        }
        if( pos.y < 0 || pos.y > Game.height ){
            this.disable();
            return;            
        }


        // ターゲットとのあたりチェック.
        if( this.checkColliTarget( pos, next ) ){
            this.disable();
            Target.I.delLife();
            //new Effect( this.shape.x, this.shape.y, 0xff0000 );
            let eff = EffectManager.I.requestEffect();
            eff.activate( this.shape.x, this.shape.y, 0xff0000 )

            return;
        }

        // ラインとのあたりチェック.
        let interPos = new egret.Point();
        let norm = new egret.Point();
        if( this.checkColliLines( pos, next, interPos, norm ) ){
            this.calcReflectVec( this.dir, norm, this.dir );

            this.velocity.x = this.dir.x * this.speed;
            this.velocity.y = this.dir.y * this.speed;

            //this.shape.x = interPos.x;
            //this.shape.y = interPos.y;
            return;            
        }

        // 障害物とのあたりチェック.
        if( this.checkObstacle( pos, next ) ){
            this.disable();
            //new Effect( this.shape.x, this.shape.y, 0x000000 );
            let eff = EffectManager.I.requestEffect();
            eff.activate( this.shape.x, this.shape.y, 0x000000 )
            return;
        }

        this.shape.x = next.x;
        this.shape.y = next.y;
        
        this.dist += this.speed;
        if( this.dist > 2000 ){
            // 消す.
            this.disable();
            //this.isDisable = true;
            //this.shape.graphics.clear();
        }
    }

    disable()
    {
        this.isDisable = true;
        this.shape.graphics.clear();
    }

    // ターゲットとの当たり判定.
    // 参考 http://sampo.hatenadiary.jp/entry/20070626/p1#f1
    checkColliTarget( pos:egret.Point, nxt:egret.Point ) : boolean
    {
        // 範囲チェック.
        /*if( (pos.x < Orbit.AreaMinX || pos.x > Orbit.AreaMaxX) &&
            (nxt.x < Orbit.AreaMinX || nxt.x > Orbit.AreaMaxX) ){
            return false;
        }
        if( (pos.y < Orbit.AreaMinY || pos.y > Orbit.AreaMaxY) &&
            (nxt.y < Orbit.AreaMinY || nxt.y > Orbit.AreaMaxY) ){
            return false;
        }*/

        // 点と線分の距離で判定.
        // ターゲット位置.
        let tarPos = Target.I.pos;

        // tarPosから線分に最も近い点.
        let near = new egret.Point();

        let a = nxt.subtract( pos );
        let b = tarPos.subtract( pos );
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

        // tarPosからnearまでの距離.
        //let dist = egret.Point.distance( pcPos, near );
        let distSq = (near.x - tarPos.x)**2 + (near.y - tarPos.y)**2;
        let rSq = (Target.I.radius+BALL_RADIUS)**2;

        if( distSq <= rSq ){
            //egret.log("hit");
            return true;
        }

        return false;
    }

    // 反射ベクトル.
    calcReflectVec( inVec:egret.Point, norm:egret.Point, out:egret.Point )
    {
        let dot = MyMath.innerProduct( inVec, norm );
        out.x = inVec.x - 2 * dot * norm.x;
        out.y = inVec.y - 2 * dot * norm.y;
        out.normalize(1);
    }

    // ボールとラインのコリジョン判定.
    checkColliLines( st1:egret.Point, ed1:egret.Point, p:egret.Point, n:egret.Point ) : boolean
    {
        let intPos = new egret.Point();

        for( let i = 0; i < DrawManager.I.lines.length; i++ ){
            let st = DrawManager.I.lines[i].startPos;
            let ed = DrawManager.I.lines[i].endPos;
            if( MyMath.isIntersectLine( st1, ed1, st, ed, intPos ) ){
                p.x = intPos.x;
                p.y = intPos.y;

                // 法線.
                let dot0 = MyMath.innerProduct( this.dir, DrawManager.I.lines[i].normals[0] );
                if( dot0 < 0 ){
                    n.x = DrawManager.I.lines[i].normals[0].x;
                    n.y = DrawManager.I.lines[i].normals[0].y;
                }
                else{
                    n.x = DrawManager.I.lines[i].normals[1].x;
                    n.y = DrawManager.I.lines[i].normals[1].y;
                }
                return true;
            }
        }
        return false;
    }

    checkObstacle( pos:egret.Point, nxt:egret.Point ) : boolean
    {
        for( let j = 0; j < ObstacleManager.I.obstacleList.length; j++ ){
            for( let i = 0; i < 4; i++ ){
                let line = ObstacleManager.I.obstacleList[j].lines[i];
                if( MyMath.isIntersectLine( pos, nxt, line.startPos, line.endPos ) ){
                    return true;
                }
            }
        }
        return false;
    }

}
