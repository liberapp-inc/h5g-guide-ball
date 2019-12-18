class Score extends GameObject{

    static I:Score = null;   // singleton instance

    static bestScore:number = 0;
    score:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();

        this.textColor = Util.color(250,250,255);

        Score.I = this;
        this.score = 0;
        this.text = Util.myText(30, 5, "SCORE : 0", 60, 0.5, this.textColor, true);
        GameObject.uiDisplay.addChild( this.text );

        /*let bestScore = window.localStorage.getItem("bestScore"); // string
        if( bestScore == null ){
            bestScore = "0";
            window.localStorage.setItem("bestScore", bestScore);
        }*/
        //this.bestScore = 0;//parseInt( bestScore );
        //this.textBest = Util.myText(0, 50, "BEST : " + Score.bestScore, 50, 0.5, this.textColor, false);
        //GameObject.display.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.uiDisplay.removeChild( this.text );
        this.text = null;
        //GameObject.display.removeChild( this.textBest );
        //this.textBest = null;
    }

    updateContent() {
    }

    addScore()
    {
        this.score += 100;
        this.text.text = "SCORE : " + this.score.toFixed();

        if( Score.bestScore < this.score ){
            Score.bestScore = this.score;
            //this.textBest.text = "BEST : " + Score.bestScore.toFixed();
        }     
    }
}
