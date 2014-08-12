var PlayScene = cc.Scene.extend({
	// a space object to represent the physic world
	space:null,
	
	onEnter: function () {
		this._super();
		
		this.initPhysics();
		
		this.gameLayer = cc.Layer.create();
		//add Background layer and Animation layer to gameLayer
		this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
		this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
		this.addChild(this.gameLayer);
		this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

		this.scheduleUpdate();
	},
	
	// init space of chipmunk
	initPhysics: function() {
		// 1. create new space object
		this.space = new cp.Space();
		// 2. setup the Gravity
		this.space.gracity = cp.v(0, -350);
		// 3. set up walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight), // start point
				cp.v(4294967295, g_groundHeight), // MAX INT:4294967295
				0); // thickness of wall
		this.space.addStaticShape(wallBottom);
	},
	
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);

		/*
		 * We should move the same delta movement of this.gameLayer which contains 
		 * background layer and animation layer in opposite direction, so we could 
		 * call the update method each frame by adding the following code at the end 
		 * of update method in PlayScene.js:
		 */
		// Simulation cpSpaceAddPostStepCallback
		this.shapesToRemove = [];
		for(var i = 0; i < this.shapesToRemove.length; i++) {
			var shape = this.shapesToRemove[i];
			this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
		}

		var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();

		this.gameLayer.setPosition(cc.p(-eyeX,0));
	}
});