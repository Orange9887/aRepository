/*
 * File: SceneFile_Parse_json.js 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, console: false, Camera: false, vec2: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SceneFileParser_json(sceneFilePath) {
    this.jsonString = gEngine.ResourceMap.retrieveAsset(sceneFilePath);

}


SceneFileParser_json.prototype.parseCamera = function () {
    var c = this.jsonString.Camera.Center;
    var w = this.jsonString.Camera.Width;
    var viewport = this.jsonString.Camera.Viewport;
    var bgColor = this.jsonString.Camera.BgColor;
    // make sure viewport and color are number
    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(
        c,  // position of the camera
        w,                        // width of camera
        viewport                  // viewport (orgX, orgY, width, height)
        );
    cam.setBackgroundColor(bgColor);
    return cam;
};

SceneFileParser_json.prototype.parseSquares = function (sqSet) {
    var i, j, pos, w, h, r, c, sq;
    for (i = 0; i < this.jsonString.Square.length; i++) {
        pos = this.jsonString.Square[i].Pos;
        w = this.jsonString.Square[i].Width;
        h = this.jsonString.Square[i].Height;
        r = this.jsonString.Square[i].Rotation;
        c = this.jsonString.Square[i].Color;
        sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        // make sure color array contains numbers
        for (j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }
        
        sq.setColor(c);
        sq.getXform().setPosition(pos[0],pos[1]);
        sq.getXform().setRotationInDegree(r); // In Degree
        sq.getXform().setSize(w, h);
        sqSet.push(sq);
    }
};
