class BallManager extends GameObject
{
    static I : BallManager = null;   // singleton instance
    private ballList : BallBase[];

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
        /*this.ballList.forEach( (element, index) => {
            if( element.isDisable ){
                idx = index;
                return;
            }
        });*/
        for( let i = 0; i < this.ballList.length; i++ ){
            if( this.ballList[i].isDisable ){
                idx = i;
                break;
            }
        }

        if( idx != -1 ){
            return this.ballList[idx];
        }
        else{
            let newBall = new BallBase( /*100, 100, new egret.Point(0,1), 200*/ );
            this.ballList.push( newBall );
            //egret.log( "num " + this.ballList.length);
            return newBall;
        }
    }


    updateContent()
    {
    }
}
