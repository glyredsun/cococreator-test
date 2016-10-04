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
        jumpDuration : 0,
        jumpHeight : 0,
        maxMoveSpeed : 0,
        accel : 0
    },

    // use this for initialization
    onLoad: function () {
        this.node.runAction(this.getJumpAction());
        
        this.accLeft = false;
        this.accRight = false;
        this.speedX = 0;
        
        this.setInputControll();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        if (this.accLeft) {
            this.speedX -= this.accel * dt;
        } else if (this.accRight) {
            this.speedX += this.accel * dt;
        }
        
        if (Math.abs(this.speedX) > this.maxMoveSpeed) {
            this.speedX = this.maxMoveSpeed * this.speedX/(Math.abs(this.speedX));
        }
        
        this.node.x += this.speedX*dt;
    },
    
    getJumpAction : function () {
        var jumpUp = cc.MoveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.MoveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    
    setInputControll : function() {
        var self = this;
        cc.eventManager.addListener({
            event : cc.EventListener.KEYBOARD,
            onKeyPressed : function(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a : {
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    }
                    case cc.KEY.d : {
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                    }
                    default : {
                    }
                }
            },
            onKeyReleased : function(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a : {
                        self.accLeft = false;
                        break;
                    }
                    case cc.KEY.d : {
                        self.accRight = false;
                        break;
                    }
                    default : {
                        
                    }
                }
            }
        }, this.node);
    }
});
