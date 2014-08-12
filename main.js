cc.game.onStart = function(){
	cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();

