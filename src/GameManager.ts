class GameManager extends GameObject
{
    static I : GameManager = null;   // singleton instance
    static isTitleEnd : boolean = false;
    public pause : boolean = false;
    public mode : number = 0;
    public timer : egret.Timer = null;
    private text : egret.TextField = null;

    constructor() {
        super();
        GameManager.I = this;

        // timer
        this.text = Util.myText(550, 5, "0", 50, 0.5, 0xc0c0c0, false);
        GameObject.uiDisplay.addChild( this.text );


        //if( !GameManager.isTitleEnd ){
        //    new Title();
        //}
        //else{
            this.gameStart();
        //}
    }

    public gameStart()
    {
        this.pause = false;

        this.timer = new egret.Timer(1000, 0);
        this.timer.start();

        //new BallGenerator();

    }

    onDestroy()
    {
        GameObject.uiDisplay.removeChild( this.text );
        this.text = null;
        
        this.timer = null;
        GameManager.I = null;
    }

    updateContent()
    {
        if( this.pause ){
            return;
        }
        
        if( this.text != null ){
            //this.text.text = this.timer.currentCount.toString();
            //this.text.text = DrawManager.I.lineRemain.toString();

            //let max = BallManager.I.ballList.length;
            let max = EffectManager.I.effectList.length;
            let live = 0;
            for( let i = 0; i < EffectManager.I.effectList.length; i++ ){
                if( !EffectManager.I.effectList[i].isDisable ){
                    live++;
                }
            }
/*            for( let i = 0; i < BallManager.I.ballList.length; i++ ){
                if( !BallManager.I.ballList[i].isDisable ){
                    live++;
                }
            }*/

            this.text.text = live.toString() + " / " + max.toString();

            if( max > 0 && live == 0 ){
                //egret.log("game over");
                //this.pause = true;
            }
        }
    }
}
