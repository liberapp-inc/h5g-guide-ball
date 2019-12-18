class Box extends GameObject{
    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.setShape(x, y, width, height, color);


    }

    setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){};

}

/*
abstract class PhysicsBox extends PhysicsObject{

    protected width :number;
    protected height :number;
    protected x : number;
    protected y : number;
    protected color : number;

    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width ;
        this.height =height;
        this.color = color;
        this.setShape(this.width, this.height);


    }

    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height: height
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }


    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }



}
*/

class MyBox extends Box{
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super(x, y, width, height, color);
    }
}