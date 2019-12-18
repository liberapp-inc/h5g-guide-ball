class Button extends GameObject
{
    private isTapped : boolean = false;
    private onTapped : ()=>void = null;
    private text : egret.TextField = null;
    static uiIndex : number = 0;

    constructor( label:string, x:number, y:number, w:number, h:number, backCol:number, fontCol:number, fontSize:number, onTappedHandler:()=>void )
    {
        super();

        //Button.uiIndex = GameObject.display.numChildren;
        //egret.log(Button.uiIndex);

        this.onTapped = onTappedHandler;
        
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;

        this.shape.graphics.beginFill(backCol);
        this.shape.graphics.drawRoundRect(0, 0, w, h, 16);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        GameObject.uiDisplay.addChild( this.shape );

        this.text = Util.myText(x+0.5*w, y+0.5*h, label, fontSize*2, 0.5, fontCol, true, true);
        GameObject.uiDisplay.addChild( this.text );

        //this.shape.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchHandler, this )
        this.shape.addEventListener( egret.TouchEvent.TOUCH_TAP, onTappedHandler, this )
    }

    onDestroy()
    {
        GameObject.uiDisplay.removeChild( this.shape );
        GameObject.uiDisplay.removeChild( this.text );
        this.shape = null;
        this.text = null;
    }
    
    /*private touchHandler( evt:egret.TouchEvent ){
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_TAP:
                //let x = evt.stageX;
                //let y = evt.stageY;
                //if( this.shape.hitTestPoint(x,y) ){
                    this.isTapped = true;
                    //console.log("touch tap " + x + ", " + y);
                //}
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret. TouchEvent.TOUCH_END:
                break;
        }
    }*/
    
    updateContent()
    {
        /*
        if( this.isTapped ){
            this.isTapped = false;
            if( this.onTapped ){
                this.onTapped();
            }
            //egret.log("tapped");
        }*/
    }
}
