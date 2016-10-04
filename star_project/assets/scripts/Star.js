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
        pickRadius : 0
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var distance = cc.pDistance(this.node.getPosition(), this.game.player.getPosition());
        if (distance < this.pickRadius) {
            this.onPicked();    
        }
    },
    
    onPicked : function() {
        this.game.spawnNewStar();
        this.node.destroy();
    }
});
