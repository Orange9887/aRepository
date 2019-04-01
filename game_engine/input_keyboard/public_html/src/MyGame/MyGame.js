/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser_json: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // scene file name
    this.kSceneFile = "assets/scene.json";
    // all squares
    this.mSqSet = [];        // these are the Renderable objects
    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // load the scene file

    gEngine.TextFileLoader_json.loadTextFile(this.kSceneFile, gEngine.TextFileLoader_json.eTextFileType.eXMLFile);
    this.GCamera = gEngine.ResourceMap.getGlobalCamera();
};

MyGame.prototype.unloadScene = function () {
    // unload the scene flie and loaded resources
    gEngine.ResourceMap.setGlobalCamera(this.GCamera);
    gEngine.TextFileLoader_json.unloadTextFile(this.kSceneFile);
    var nextLevel = new BlueLevel();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser_json(this.kSceneFile);
    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();
    // Step B: Read all the squares
    sceneParser.parseSquares(this.mSqSet);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
    
    this.GCamera.setupViewProjection();
    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.GCamera.getVPMatrix());
    }
   
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var deltaTheta = 360/5/60;
    this.mSqSet[1].getXform().incRotationByDegree(deltaTheta);
    
    var deltaX = -20/3/60;
    this.mSqSet[0].getXform().incXPosBy(deltaX);
    if (this.mSqSet[0].getXform().getXPos() < 5) { // this is the right-bound of the window
            this.mSqSet[0].getXform().setPosition(35, 60);
        }
        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        var temp = this.GCamera.getViewport();
        temp[1]=temp[1]+1;
        if(temp[1]>400)
        {
            temp[1]=400;
        }
        this.GCamera.setViewport(temp);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        var temp = this.GCamera.getViewport();
        temp[1]=temp[1]-1;
        if(temp[1]<0)
        {
            temp[1]=0;
        }
        this.GCamera.setViewport(temp);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        var temp = this.GCamera.getViewport();
        temp[0]=temp[0]+1;
        if(temp[0]>600)
        {
            temp[0]=600;
        }
        this.GCamera.setViewport(temp);
    }
    else if (! gEngine.Input.isKeyReleased(gEngine.Input.keys.A)) {
        var temp = this.GCamera.getViewport();
        temp[0]=temp[0]-1;
        if(temp[0]<0)
        {
            temp[0]=0;
        }
        this.GCamera.setViewport(temp);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
        var temp = this.mCamera.getWCCenter();
        temp[1]=temp[1]+0.05;
        if(temp[1]>80)
        {
            temp[1]=80;
        }
        this.mCamera.setWCCenter(temp[0],temp[1]);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        var temp = this.mCamera.getWCCenter();
        temp[1]=temp[1]-0.05;
        if(temp[1]<0)
        {
            temp[1]=0;
        }
        this.mCamera.setWCCenter(temp[0],temp[1]);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
        var temp = this.mCamera.getWCCenter();
        temp[0]=temp[0]+0.05;
        if(temp[0]>40)
        {
            temp[0]=40;
        }
        this.mCamera.setWCCenter(temp[0],temp[1]);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        var temp = this.mCamera.getWCCenter();
        temp[0]=temp[0]-0.05;
        if(temp[0]<0)
        {
            temp[0]=0;
        }
        this.mCamera.setWCCenter(temp[0],temp[1]);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        var temp = this.mCamera.getWCWidth();
        temp=temp+0.2;
        if(temp>100)
        {
            temp=20;
        }
        this.mCamera.setWCWidth(temp);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        var temp = this.mCamera.getWCWidth();
        temp=temp-0.2;
        if(temp<20)
        {
            temp=90;
        }
        this.mCamera.setWCWidth(temp);
    }
    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }

};