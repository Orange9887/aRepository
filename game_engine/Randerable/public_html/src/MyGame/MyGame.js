/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    //this.mRec = null;        // these are the Renderable objects
    //this.mTri = null;
    //this.mCir = null;

    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");     // Path to the Simple FragmentShader

    // Step C: Create the Renderable objects:
    this.mRec1 = new Renderable(this.mConstColorShader);
    this.mRec1.setColor([1, 1, 1, 1]);
    this.mRec2 = new Renderable(this.mConstColorShader);
    this.mRec2.setColor([1, 0.84, 0, 1]);
    this.mRec3 = new Renderable(this.mConstColorShader);
    this.mRec3.setColor([1, 0.89, 0.71, 1]);
    this.mRec4 = new Renderable(this.mConstColorShader);
    this.mRec4.setColor([1, 0.39, 0.28, 1]);
    this.mRec5 = new Renderable(this.mConstColorShader);
    this.mRec5.setColor([1, 0.84, 0, 0.5]);
    
    this.mTri1 = new Renderable(this.mConstColorShader);
    this.mTri1.setColor([1, 1, 1, 1]);
    this.mTri2 = new Renderable(this.mConstColorShader);
    this.mTri2.setColor([1, 0.84, 0, 1]);
    this.mTri3 = new Renderable(this.mConstColorShader);
    this.mTri3.setColor([1, 0.89, 0.71, 1]);
    this.mTri4 = new Renderable(this.mConstColorShader);
    this.mTri4.setColor([1, 0.39, 0.28, 1]);
    this.mTri5 = new Renderable(this.mConstColorShader);
    this.mTri5.setColor([1, 0.84, 0, 0.5]);
    
    this.mCir1 = new Renderable(this.mConstColorShader);
    this.mCir1.setColor([1, 1, 1, 1]);
    this.mCir2 = new Renderable(this.mConstColorShader);
    this.mCir2.setColor([1, 0.84, 0, 1]);
    this.mCir3 = new Renderable(this.mConstColorShader);
    this.mCir3.setColor([1, 0.89, 0.71, 1]);
    this.mCir4 = new Renderable(this.mConstColorShader);
    this.mCir4.setColor([1, 0.39, 0.28, 1]);
    this.mCir5 = new Renderable(this.mConstColorShader);
    this.mCir5.setColor([1, 0.84, 0, 0.5]);

    // Step D: Draw!
    gEngine.Core.clearCanvas([0.53, 0.81, 0.98, 1]);   // 1. Clear the canvas

    // instead of simply drawing the squares, let's apply simple transforms
    // Step E: sets the blue Renderable object's transform
    this.mRec1.getXform().setPosition(-0.8, 0.5);
    this.mRec2.getXform().setPosition(-0.4, 0.5);
    this.mRec3.getXform().setPosition(-0.0, 0.5);
    this.mRec4.getXform().setPosition(0.4, 0.5);
    this.mRec5.getXform().setPosition(0.8, 0.5);
    
    //this.mRec.getXform().setRotationInRad(0.2); // In Radians
    this.mRec1.getXform().setSize(0.15, 0.15);
    this.mRec2.getXform().setSize(0.10, 0.20);
    this.mRec3.getXform().setSize(0.20, 0.10);
    this.mRec4.getXform().setSize(0.25, 0.25);
    this.mRec5.getXform().setSize(0.35, 0.35);
    
    this.mRec1.drawRec();
    this.mRec2.drawRec();
    this.mRec3.drawRec();
    this.mRec4.drawRec();
    this.mRec5.drawRec();
    
    
    this.mTri1.getXform().setPosition(-0.8, 0);
    this.mTri2.getXform().setPosition(-0.4, 0);
    this.mTri3.getXform().setPosition(-0.0, 0);
    this.mTri4.getXform().setPosition(0.4, 0);
    this.mTri5.getXform().setPosition(0.8, 0);
    
    this.mTri1.getXform().setSize(0.15, 0.15);
    this.mTri2.getXform().setSize(0.10, 0.20);
    this.mTri3.getXform().setSize(0.20, 0.10);
    this.mTri4.getXform().setSize(0.25, 0.25);
    this.mTri5.getXform().setSize(0.35, 0.35);

    this.mTri1.drawTri();
    this.mTri2.drawTri();
    this.mTri3.drawTri();
    this.mTri4.drawTri();
    this.mTri5.drawTri();
    
  
    this.mCir1.getXform().setPosition(-0.8, -0.5);
    this.mCir2.getXform().setPosition(-0.4, -0.5);
    this.mCir3.getXform().setPosition(-0.0, -0.5);
    this.mCir4.getXform().setPosition(0.4, -0.5);
    this.mCir5.getXform().setPosition(0.8, -0.5);
    
    this.mCir1.getXform().setSize(0.15, 0.15);
    this.mCir2.getXform().setSize(0.10, 0.20);
    this.mCir3.getXform().setSize(0.20, 0.10);
    this.mCir4.getXform().setSize(0.25, 0.25);
    this.mCir5.getXform().setSize(0.35, 0.35);
    
    this.mCir1.drawCir();
    this.mCir2.drawCir();
    this.mCir3.drawCir();
    this.mCir4.drawCir();
    this.mCir5.drawCir();
    
}