class ObstacleManager extends GameObject
{
    static I : ObstacleManager = null;
    public obstacleList : Obstacle[] = new Array();

    constructor()
    {
        super();
        ObstacleManager.I = this;

        this.obstacleList.push( new Obstacle(400, 300, 50, 100) );
        //this.obstacleList.push( new Obstacle(250, 150, 50, 100) );
    }

    onDestroy() {
    }

    updateContent(){}
}
