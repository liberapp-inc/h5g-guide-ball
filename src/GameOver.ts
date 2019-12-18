class GameOver extends GameObject{

    textGameOver : egret.TextField = null;
    textScore : egret.TextField = null;
    textHiScore : egret.TextField = null;
    textColor : number = 0x00c0e0;

    constructor( isClear:boolean = false ) {
        super();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x000000, 0.5);
        this.shape.graphics.drawRect(0, Game.height*0.25, Game.width, Game.height*0.5);
        this.shape.graphics.endFill();
        GameObject.uiDisplay.addChild(this.shape);

        if( isClear ){
            this.textGameOver = Util.myText(Game.width/2, Game.height/2 - 160, "GAME CLEAR", 100, 0.5, this.textColor, true, true);
        }
        else{
            this.textGameOver = Util.myText(Game.width/2, Game.height/2 - 160, "GAME OVER", 100, 0.5, 0xc00020, true, true);        
        }
        GameObject.uiDisplay.addChild( this.textGameOver );
        
        this.textScore = Util.myText(Game.width/2, Game.height/2 - 60, "SCORE : " + Score.I.score, 80, 0.5, this.textColor, true, true);
        GameObject.uiDisplay.addChild( this.textScore );

        this.textHiScore = Util.myText(Game.width/2, Game.height/2 + 30, "HI-SCORE : " + Score.bestScore, 75, 0.5, this.textColor, true, true);
        GameObject.uiDisplay.addChild( this.textHiScore );

        /*if( Score.I.score >= Score.I.bestScore ){
            window.localStorage.setItem("bestScore", Score.I.score.toFixed() ); // string
        }*/

        let w = 230;
        let h = 90;
        new Button( "RETRY", Game.width/2-w/2, Game.height/2 + 130, w, h, 0xf0f0f0, 0x606060, 40, this.onButton );
    }

    onDestroy() {
        GameObject.uiDisplay.removeChild( this.shape );
        this.shape = null;
        GameObject.uiDisplay.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.uiDisplay.removeChild( this.textScore );
        this.textScore = null;
        GameObject.uiDisplay.removeChild( this.textHiScore );
        this.textHiScore = null;
    }
    
    updateContent() {
    }

    onButton()
    {
        GameObject.transit = Game.init;
    }
}