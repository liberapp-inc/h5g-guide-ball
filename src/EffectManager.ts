class EffectManager extends GameObject
{
    static I : EffectManager = null;   // singleton instance
    public effectList : Effect[];

    constructor() {
        super();
        EffectManager.I = this;

        this.effectList = [];

    }

    onDestroy() {
        this.effectList = [];
        EffectManager.I = null;
    }

    requestEffect() : Effect
    {
        let idx = -1;

        for( let i = 0; i < this.effectList.length; i++ ){
            if( this.effectList[i].isDisable ){
                idx = i;
                break;
            }
        }

        if( idx != -1 ){
            // 再利用.
            return this.effectList[idx];
        }
        else{
            // 新規作成.
            let newEff = new Effect( /*100, 100, new egret.Point(0,1), 200*/ );
            this.effectList.push( newEff );
            return newEff;
        }
    }


    updateContent()
    {
    }
}
