class Gauge extends GameObject
{
    private max : number;
    private text : egret.TextField = null;

    constructor( max:number )
    {
        super();

        this.max = max;

        this.shape = new egret.Shape();
        this.shape.graphics.lineStyle( 4, LINE_COL );
        this.shape.graphics.moveTo( 10, 65 );
        this.shape.graphics.lineTo( 10+this.max, 65 );
        GameObject.gameDisplay.addChild( this.shape );

        this.text = Util.myText( 5, 40, "ライン残り", 40, 0.5, 0xf0f0f0, false, false );
        GameObject.uiDisplay.addChild( this.text );
    }

    onDestroy()
    {
        GameObject.gameDisplay.removeChild( this.shape );
        this.shape = null;

        GameObject.uiDisplay.removeChild( this.text );
        this.text = null;
    }

    updateContent()
    {
    }

    updateGauge( remain:number )
    {
        this.shape.graphics.clear();

        if( remain > 0 ){
            this.shape.graphics.lineStyle( 4, LINE_COL );
            this.shape.graphics.moveTo( 0, 65 );
            this.shape.graphics.lineTo( 0+remain, 65 );        
        }
    }
}
