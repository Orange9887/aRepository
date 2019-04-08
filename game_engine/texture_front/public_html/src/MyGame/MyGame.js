/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // textures: 
    this.kMinionSprite = "assets/minion_sprite.png";  // Portal and Collector are embedded here
    this.kBound = "assets/Bound.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mCamera_2= null;
    // the hero and the support objects
    //this.mHero = null;
    this.mFrame = null;
    this.mFrame_2 = null;
    this.mSqSet_lt = null;
    this.mSqSet_lb = null;
    this.mSqSet_rt = null;
    this.mSqSet_rb = null;
    this.mSqSet_r = null;
    this.mSqSet_b = null;
    this.mSqSet_l = null;
    this.mSqSet_t = null;
    this.mPortal = null;
    this.mBound = null;
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // loads the textures
    //gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBound);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBound);
    var nextLevel = new MyGame_2();
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [0, 0, 420, 480]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mCamera_2 = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        3,                     // width of camera
        [420, 130, 220, 220]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera_2.setBackgroundColor([0.85, 0.94, 0.15, 0.1]);
    
    
    this.mSqSet_lt = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_lt.setColor([1, 0, 0, 0.6]);
    this.mSqSet_lt.getXform().setPosition(11, 65);
    this.mSqSet_lt.getXform().setSize(0.8,0.8);
    this.mSqSet_lb = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_lb.setColor([0, 1, 0, 0.6]);
    this.mSqSet_lb.getXform().setPosition(11, 55);
    this.mSqSet_lb.getXform().setSize(0.8,0.8);
    this.mSqSet_rt = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_rt.setColor([0, 0, 1, 0.6]);
    this.mSqSet_rt.getXform().setPosition(29, 65);
    this.mSqSet_rt.getXform().setSize(0.8,0.8);
    this.mSqSet_rb = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_rb.setColor([1, 1, 0, 0.6]);
    this.mSqSet_rb.getXform().setPosition(29, 55);
    this.mSqSet_rb.getXform().setSize(0.8,0.8);
    this.mSqSet_r = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_r.setColor([1, 0, 1, 0.6]);
    this.mSqSet_r.getXform().setPosition(21.5, 60);
    this.mSqSet_r.getXform().setSize(0.4,0.4);
    this.mSqSet_b = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_b.setColor([0, 1, 1, 0.6]);
    this.mSqSet_b.getXform().setPosition(20, 58.5);
    this.mSqSet_b.getXform().setSize(0.4,0.4);
    this.mSqSet_l = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_l.setColor([1, 0.5, 0.5, 0.6]);
    this.mSqSet_l.getXform().setPosition(18.5, 60);
    this.mSqSet_l.getXform().setSize(0.4,0.4);
    this.mSqSet_t = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSqSet_t.setColor([0.5, 1, 0.5, 0.6]);
    this.mSqSet_t.getXform().setPosition(20, 61.5);
    this.mSqSet_t.getXform().setSize(0.4,0.4);
    this.mFrame = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mFrame.setColor([0, 0, 0, 0.6]);
    this.mFrame.getXform().setPosition(20, 60);
    this.mFrame.getXform().setSize(18,10);
    this.mFrame_2 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mFrame_2.setColor([1, 1, 1, 1]);
    this.mFrame_2.getXform().setPosition(20, 60);
    this.mFrame_2.getXform().setSize(2.99,2.99);
    
    this.mPortal = new SpriteRenderable(this.kMinionSprite);
    this.mPortal.setColor([0, 0, 0, 0.2]);  // tints red
    this.mPortal.getXform().setPosition(20, 60);
    this.mPortal.getXform().setSize(18, 10);
    this.mPortal.setElementPixelPositions(0, 1024, 0, 512);
    this.mBound = new SpriteRenderable(this.kBound);
    this.mBound.setColor([0, 0, 0, 0.2]);  // tints red
    this.mBound.getXform().setPosition(20, 60);
    this.mBound.getXform().setSize(3, 3);
    this.mBound.setElementPixelPositions(0, 512,0, 512);
   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mPortal.draw(this.mCamera.getVPMatrix());
    this.mBound.draw(this.mCamera.getVPMatrix());
    this.mFrame.draw_2(this.mCamera.getVPMatrix());
    this.mSqSet_lt.draw(this.mCamera.getVPMatrix());
    this.mSqSet_lb.draw(this.mCamera.getVPMatrix());
    this.mSqSet_rt.draw(this.mCamera.getVPMatrix());
    this.mSqSet_rb.draw(this.mCamera.getVPMatrix());
    this.mSqSet_r.draw(this.mCamera.getVPMatrix());
    this.mSqSet_b.draw(this.mCamera.getVPMatrix());
    this.mSqSet_l.draw(this.mCamera.getVPMatrix());
    this.mSqSet_t.draw(this.mCamera.getVPMatrix());
    this.mCamera_2.setupViewProjection();
    this.mPortal.draw(this.mCamera_2.getVPMatrix());
    this.mFrame_2.draw_2(this.mCamera_2.getVPMatrix());
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z))
    {
        gEngine.GameLoop.stop();
    }
    var xform=this.mBound.getXform();
    var line2=this.mFrame_2.getXform();
    var Camera_2=this.mCamera_2;
    var deltaX = 0.05;
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        xform.incXPosBy(-deltaX);
        line2.incXPosBy(-deltaX);
        Camera_2.incWCCenterX(-deltaX);
        this.mSqSet_r.getXform().incXPosBy(-deltaX);
        this.mSqSet_b.getXform().incXPosBy(-deltaX);
        this.mSqSet_l.getXform().incXPosBy(-deltaX);
        this.mSqSet_t.getXform().incXPosBy(-deltaX);
        if((xform.getXPos()-xform.getWidth()/2)<11)
        {
            xform.incXPosBy(deltaX);
            line2.incXPosBy(deltaX);
            Camera_2.incWCCenterX(deltaX);
            this.mSqSet_r.getXform().incXPosBy(deltaX);
            this.mSqSet_b.getXform().incXPosBy(deltaX);
            this.mSqSet_l.getXform().incXPosBy(deltaX);
            this.mSqSet_t.getXform().incXPosBy(deltaX);
        }
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        xform.incXPosBy(deltaX);
        line2.incXPosBy(deltaX);
        Camera_2.incWCCenterX(deltaX);
        this.mSqSet_r.getXform().incXPosBy(deltaX);
        this.mSqSet_b.getXform().incXPosBy(deltaX);
        this.mSqSet_l.getXform().incXPosBy(deltaX);
        this.mSqSet_t.getXform().incXPosBy(deltaX);
        if((xform.getXPos()+xform.getWidth()/2)>29)
        {
            xform.incXPosBy(-deltaX);
            line2.incXPosBy(-deltaX);
            Camera_2.incWCCenterX(-deltaX);
            this.mSqSet_r.getXform().incXPosBy(-deltaX);
            this.mSqSet_b.getXform().incXPosBy(-deltaX);
            this.mSqSet_l.getXform().incXPosBy(-deltaX);
            this.mSqSet_t.getXform().incXPosBy(-deltaX);
        }
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
    {
        xform.incYPosBy(deltaX);
        line2.incYPosBy(deltaX);
        Camera_2.incWCCenterY(deltaX);
        this.mSqSet_r.getXform().incYPosBy(deltaX);
        this.mSqSet_b.getXform().incYPosBy(deltaX);
        this.mSqSet_l.getXform().incYPosBy(deltaX);
        this.mSqSet_t.getXform().incYPosBy(deltaX);
        if((xform.getYPos()+xform.getHeight()/2)>65)
        {
            xform.incYPosBy(-deltaX);
            line2.incYPosBy(-deltaX);
            Camera_2.incWCCenterY(-deltaX);
            this.mSqSet_r.getXform().incYPosBy(-deltaX);
            this.mSqSet_b.getXform().incYPosBy(-deltaX);
            this.mSqSet_l.getXform().incYPosBy(-deltaX);
            this.mSqSet_t.getXform().incYPosBy(-deltaX);
        }
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        xform.incYPosBy(-deltaX);
        line2.incYPosBy(-deltaX);
        Camera_2.incWCCenterY(-deltaX);
        this.mSqSet_r.getXform().incYPosBy(-deltaX);
        this.mSqSet_b.getXform().incYPosBy(-deltaX);
        this.mSqSet_l.getXform().incYPosBy(-deltaX);
        this.mSqSet_t.getXform().incYPosBy(-deltaX);
        if((xform.getYPos()-xform.getHeight()/2)<55)
        {
            xform.incYPosBy(deltaX);
            line2.incYPosBy(deltaX);
            Camera_2.incWCCenterY(deltaX);
            this.mSqSet_r.getXform().incYPosBy(deltaX);
            this.mSqSet_b.getXform().incYPosBy(deltaX);
            this.mSqSet_l.getXform().incYPosBy(deltaX);
            this.mSqSet_t.getXform().incYPosBy(deltaX);
        }
    }
    var deltaX_2=0.03;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incWidthBy(-deltaX_2);
        line2.incWidthBy(-deltaX_2);
        this.mSqSet_r.getXform().incXPosBy(-deltaX_2/2);
        this.mSqSet_l.getXform().incXPosBy(deltaX_2/2);
        if(xform.getWidth()<0.5){
            xform.incWidthBy(deltaX_2);
            line2.incWidthBy(deltaX_2);
            this.mSqSet_r.getXform().incXPosBy(deltaX_2/2);
            this.mSqSet_l.getXform().incXPosBy(-deltaX_2/2);
        }
        var Camera2_Size=xform.getSize();
        var width = Camera2_Size[0];
        var height = Camera2_Size[1];
        var ratio = width/height;
        if(ratio > 22/48){
            var height_2=(220*height)/width;
            var viewport_array=[420,240-height_2/2,220,height_2];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
        else{
            var width_2=(480*width)/height;
            var viewport_array=[530-width_2/2,0,width_2,480];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incWidthBy(deltaX_2);
        line2.incWidthBy(deltaX_2);
        this.mSqSet_r.getXform().incXPosBy(deltaX_2/2);
        this.mSqSet_l.getXform().incXPosBy(-deltaX_2/2);
        if ((xform.getXPos()+xform.getWidth()/2)>29 || (xform.getXPos()-xform.getWidth()/2)<11) { // this is the right-bound of the window
            xform.incWidthBy(-deltaX_2);
            line2.incWidthBy(-deltaX_2);
            this.mSqSet_r.getXform().incXPosBy(-deltaX_2/2);
            this.mSqSet_l.getXform().incXPosBy(deltaX_2/2);
        }
                var Camera2_Size=xform.getSize();
        var width = Camera2_Size[0];
        var height = Camera2_Size[1];
        var ratio = width/height;
        if(ratio > 22/48){
            var height_2=(220*height)/width;
            //alert(height_2);
            var viewport_array=[420,240-height_2/2,220,height_2];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
        else{
            var width_2=(480*width)/height;
            var viewport_array=[530-width_2/2,0,width_2,480];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        xform.incHeightBy(deltaX_2);
        line2.incHeightBy(deltaX_2);
        this.mSqSet_t.getXform().incYPosBy(deltaX_2/2);
        this.mSqSet_b.getXform().incYPosBy(-deltaX_2/2);
        if ((xform.getYPos()+xform.getHeight()/2)>65 || (xform.getYPos()-xform.getHeight()/2)<55) { // this is the right-bound of the window
            xform.incHeightBy(-deltaX_2);
            line2.incHeightBy(-deltaX_2);
            this.mSqSet_t.getXform().incYPosBy(-deltaX_2/2);
            this.mSqSet_b.getXform().incYPosBy(deltaX_2/2);
        }
        var Camera2_Size=xform.getSize();
        var width = Camera2_Size[0];
        var height = Camera2_Size[1];
        var ratio = width/height;
        if(ratio > 22/48){
            var height_2=(220*height)/width;
            //alert(height_2);
            var viewport_array=[420,240-height_2/2,220,height_2];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
        else{
            var width_2=(480*width)/height;
            var viewport_array=[530-width_2/2,0,width_2,480];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        xform.incHeightBy(-deltaX_2);
        line2.incHeightBy(-deltaX_2);
        this.mSqSet_t.getXform().incYPosBy(-deltaX_2/2);
        this.mSqSet_b.getXform().incYPosBy(deltaX_2/2);
        if(xform.getHeight()<0.5){
            xform.incHeightBy(deltaX_2);
            line2.incHeightBy(deltaX_2);
            this.mSqSet_t.getXform().incYPosBy(deltaX_2/2);
            this.mSqSet_b.getXform().incYPosBy(-deltaX_2/2);
        }
        var Camera2_Size=xform.getSize();
        var width = Camera2_Size[0];
        var height = Camera2_Size[1];
        var ratio = width/height;
        if(ratio > 22/48){
            var height_2=(220*height)/width;
            //alert(height_2);
            var viewport_array=[420,240-height_2/2,220,height_2];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
        else{
            var width_2=(480*width)/height;
            var viewport_array=[530-width_2/2,0,width_2,480];
            Camera_2.setViewport(viewport_array);
            Camera_2.setWCWidth(width);
        }
    }
};