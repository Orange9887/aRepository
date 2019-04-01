"use strict"; 

var gEngine = gEngine || { };

gEngine.TextFileLoader_json = (function () {
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            // Asynchronously request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            
            req.responseType = 'json';
            req.open('GET', fileName, true);

            req.onload = function () {
                var fileContent = null;
                if (fileType === eTextFileType.eXMLFile) {
                    fileContent = req.response;
                } else {
                    fileContent = req.responseText;
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
                if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                    callbackFunction(fileName);
                }
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(fileName);
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }
        }
    };

    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };

    var mPublic = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        eTextFileType: eTextFileType
    };
    return mPublic;
}());