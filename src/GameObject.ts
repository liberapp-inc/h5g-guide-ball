// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、addDestroyMethod()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）

abstract class GameObject {
    
    public shape:egret.Shape = null;
    
    public static objects: GameObject[] = [];
    public static display: egret.DisplayObjectContainer;
    public static transit:()=>void;
    protected destroyFlag : boolean = false;
    public static gameDisplay: egret.DisplayObjectContainer;
    public static uiDisplay: egret.DisplayObjectContainer;


    constructor() {
        GameObject.objects.push(this);
    }


    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
        GameObject.gameDisplay = new egret.DisplayObjectContainer();
        GameObject.uiDisplay = new egret.DisplayObjectContainer();
        GameObject.display.addChild( GameObject.gameDisplay );
        GameObject.display.addChild( GameObject.uiDisplay );
    }

    abstract updateContent() : void;

    static update(){
        //繰り返しメソッド
        GameObject.objects.forEach(obj => obj.updateContent());

        //destroyFlagがtrueならshapeを削除
        GameObject.objects = GameObject.objects.filter( obj =>{
            if( obj.destroyFlag ) obj.delete();
            return ( !obj.destroyFlag );
        } );

        if( GameObject.transit ) {
            GameObject.allDestroy();
            GameObject.transit();
            GameObject.transit = null;
        }

    }

    static allDestroy(){

        //egret.log("obj num "+GameObject.objects.length);

        GameObject.objects = GameObject.objects.filter( obj => {
            obj.destroy();
            obj.delete();
            return false; 
        });
    }

    //オブジェクトを削除
    destroy() { this.destroyFlag = true; }
    
    //shapeの削除など、destroy後に後処理が必要なら記述
    onDestroy(){}

    private delete(){
        this.onDestroy();

        /*
        if( this.shape ){
            GameObject.display.removeChild(this.shape);
            //this.shape.parent.removeChild(this.shape);
            this.shape = null;
        }*/
    }

}

/*
abstract class PhysicsObject extends GameObject{

    protected body : p2.Body = null;
    protected bodyShape : p2.Circle | p2.Box = null;
    protected static world : p2.World = null;

    constructor(){
        super();
    }

    abstract updateContent() : void;

    addDestroyMethod(){
        CreateWorld.world.removeBody(this.body);
    }


}
*/
