var AnimationLayer = cc.Layer.extend({
	spriteSheet:null,
	runningAction:null,
	sprite:null,
	space: null,
	
	ctor: function(space) {
		this._super();
		this.space = space;
		
		this._debugNode = cc.PhysicsDebugNode.create(this.space);
		this._debugNode.setVisible(false);
		// Parallax ratio and offset
		this.addChild(this._debugNode, 10);
		
		this.init();
	},

	init: function() {
		this._super();
		
		// create sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
		this.spriteSheet = cc.SpriteBatchNode.create(res.runner_png);
		this.addChild(this.spriteSheet);
		
		//init runningAction
		var animFrames = [];
		for (var i = 0; i < 8; i++) {
			var str = "runner" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		
		var animation = cc.Animation.create(animFrames, 0.1);
		this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
		
		//1. create PhysicsSprite with a sprite frame name
		this.sprite = cc.PhysicsSprite.create("#runner0.png");
		var contentSize = this.sprite.getContentSize();
		// 2. init the runner physic body
		this.body = new cp.Body(1,cp.momentForBox(1, contentSize.width, contentSize.height));
		//3. set the position of the runner
		this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
		//4. apply impulse to the body
		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
		//5. add the created body to space
		this.space.addBody(this.body);
		//6. create the shape for the body
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		//7. add shape to space
		this.space.addShape(this.shape);
		//8. set body to the physic sprite
		this.sprite.setBody(this.body);
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
	},
	
	getEyeX:function () {
		return this.sprite.getPositionX() - g_runnerStartX;
	},
	
	update: function() {
		// update meter
		var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
		statusLayer.updateMeter(this.sprite.getPositionX() - g_runnerStartX);
	}
});
