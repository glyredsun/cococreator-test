cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        player : {
            default : null,
            type : cc.Node
        },
        starPrefab : {
            default : null,
            type : cc.Prefab
        },
        ground : {
            default : null,
            type : cc.Node
        },
        maxStarDuration : 0,
        minStarDuration : 0
    },

    // use this for initialization
    onLoad: function () {
        this.groundY = this.ground.y + this.ground.height/2;
        
        this.spawnNewStar();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
    },
    
    spawnNewStar : function () {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.getComponent("Star").game = this;
        var posY = cc.random0To1() * this.player.getComponent("Player").jumpHeight + this.groundY + 50;
        var posX = this.node.width/2 * cc.randomMinus1To1();
        newStar.setPosition(cc.p(posX, posY));
    }
});
