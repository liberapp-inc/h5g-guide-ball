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

        //new BallBase(100, 200, new egret.Point(0,1), 300 );
        new BallGenerator();

    }


    onDestroy() {
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
            this.text.text = this.timer.currentCount.toString();
        }
    }
}
