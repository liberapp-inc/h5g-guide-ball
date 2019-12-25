class MyMath
{
    // 内積.
    static innerProduct( v1:egret.Point, v2:egret.Point ) : number
    {
        return v1.x*v2.x + v1.y*v2.y;
    }

    // 外積.
    static outerProduct( v1:egret.Point, v2:egret.Point ) : number
    {
        return v1.x*v2.y - v1.y*v2.x;
    }

    // 線分と線分の当たり判定.
    // out p : 交点
    static isIntersectLine( st1:egret.Point, ed1:egret.Point, st2:egret.Point, ed2:egret.Point, p:egret.Point=null ) : boolean
    {
        let v1 = new egret.Point( st1.x - st2.x, st1.y - st2.y );
        let vA = new egret.Point( ed1.x - st1.x, ed1.y - st1.y );
        let vB = new egret.Point( ed2.x - st2.x, ed2.y - st2.y );

        // 外積.
        let cross = vA.x * vB.y - vA.y * vB.x;

        // 外積=0(平行)なら交差しない.
        if( Math.abs( cross ) < 0.00001 ) {
            return false;
        }

        let t = ( v1.y * vB.x - v1.x * vB.y ) / cross;
        let s = ( v1.y * vA.x - v1.x * vA.y ) / cross;

        if( t < 0 || t > 1 || s < 0 || s > 1 ) {
            return false;
        }

        if( p != null ){
            p.x = vA.x * t + st1.x;
            p.y = vA.y * t + st1.y;
        }

        return true;
    }

}
