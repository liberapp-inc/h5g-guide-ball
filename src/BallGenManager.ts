class BallGenManager extends GameObject
{
    static I : BallGenManager = null;   // singleton instance
    private generatorList : BallGenerator[];
    private genRemain : number;

    constructor() {
        super();
        BallGenManager.I = this;

        this.generatorList = [];

        this.generatorList.push( new BallGenerator( 200, 300, 30, Math.PI, 200, 30 ) );

        this.genRemain = this.generatorList.length;
    }

    onDestroy() {
        this.generatorList = [];
        BallGenManager.I = null;
    }


    updateContent()
    {

        /*let allEnd = true;
        for( let i = 0; i < this.generatorList.length; i++ ){
            if( !this.generatorList[i].isEnd ){
                allEnd = false;
                break;
            }
        }

        if( allEnd ){
            // game over.
            egret.log("game over");
        }*/
    }
}
