/*
 * File: EngineCore_VertexBuffer.js
 *  
 * defines the object that supports the loading and using of the buffer that 
 * contains vertex positions of a square onto the gGL context
 * 
 * Notice, this is a singleton object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;

    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0,
        - 0.5, -0.5 / Math.sqrt(3), 0.0,
        0.5, -0.5 / Math.sqrt(3), 0.0,
        0.0, Math.sqrt(3) / 3, 0.0
    ];
    
    var n = 64;
    var angle = 0;
    var r = 0.5;
    var delta = 2 * Math.PI / n;
    for(var i = 0; i < 2 * n; i += 2){
        verticesOfSquare.push( r * Math.cos(angle));
        verticesOfSquare.push( r * Math.sin(angle));
        verticesOfSquare.push(0);
        angle += delta;
    }
    

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // Step A: Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();

        // Step B: Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Step C: Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () { return mSquareVertexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };

    return mPublic;
}());