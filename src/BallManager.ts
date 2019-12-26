class BallManager extends GameObject
{
    static I : BallManager = null;   // singleton instance
    public ballList : BallBase[];

    constructor() {
        super();
        BallManager.I = this;

        this.ballList = [];

    }

    onDestroy() {
        this.ballList = [];
        BallManager.I = null;
    }

    requestBall() : BallBase
    {
        let idx = -1;

        for( let i = 0; i < this.ballList.length; i++ ){
            if( this.ballList[i].isDisable ){
                idx = i;
                break;
            }
        }

        if( idx != -1 ){
            // 再利用.
            return this.ballList[idx];
        }
        else{
            // 新規作成.
            let newBall = new BallBase( /*100, 100, new egret.Point(0,1), 200*/ );
            this.ballList.push( newBall );
            //egret.log( "num " + this.ballList.length);
            return newBall;
        }
    }


    updateContent()
    {
        let isEnd = true;
        for( let i = 0; i < this.ballList.length; i++ ){
            if( !this.ballList[i].isDisable ){
                isEnd = false;
                break;
            }
        }
        if( isEnd ){
            //egret.log("ball 0");
        }
    }
}
