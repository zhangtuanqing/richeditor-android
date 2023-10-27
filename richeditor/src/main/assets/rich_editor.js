/**
 * Copyright (C) 2020 Wasabeef
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * See about document.execCommand: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 */

var RE = {};

RE.currentSelection = {
    "startContainer": 0,
    "startOffset": 0,
    "endContainer": 0,
    "endOffset": 0
};

RE.editor = document.getElementById('editor');

document.addEventListener("selectionchange", function () { RE.backuprange(); });

// Initializations
RE.callback = function () {
    window.location.href = "re-callback://" + encodeURIComponent(RE.getHtml());
}

RE.setHtml = function (contents) {
    RE.editor.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
}

RE.getHtml = function () {
    return RE.editor.innerHTML;
}

RE.getText = function () {
    return RE.editor.innerText;
}

RE.setBaseTextColor = function (color) {
    RE.editor.style.color = color;
}

RE.setBaseFontSize = function (size) {
    RE.editor.style.fontSize = size;
}

RE.setPadding = function (left, top, right, bottom) {
    RE.editor.style.paddingLeft = left;
    RE.editor.style.paddingTop = top;
    RE.editor.style.paddingRight = right;
    RE.editor.style.paddingBottom = bottom;
}

RE.setBackgroundColor = function (color) {
    document.body.style.backgroundColor = color;
}

RE.setBackgroundImage = function (image) {
    RE.editor.style.backgroundImage = image;
}

RE.setWidth = function (size) {
    RE.editor.style.minWidth = size;
}

RE.setHeight = function (size) {
    RE.editor.style.height = size;
}

RE.setTextAlign = function (align) {
    RE.editor.style.textAlign = align;
}

RE.setVerticalAlign = function (align) {
    RE.editor.style.verticalAlign = align;
}

RE.setPlaceholder = function (placeholder) {
    RE.editor.setAttribute("placeholder", placeholder);
}

RE.setInputEnabled = function (inputEnabled) {
    RE.editor.contentEditable = String(inputEnabled);
}

RE.undo = function () {
    document.execCommand('undo', false, null);
}

RE.redo = function () {
    document.execCommand('redo', false, null);
}

RE.setBold = function () {
    document.execCommand('bold', false, null);
}

RE.setItalic = function () {
    document.execCommand('italic', false, null);
}

RE.setSubscript = function () {
    document.execCommand('subscript', false, null);
}

RE.setSuperscript = function () {
    document.execCommand('superscript', false, null);
}

RE.setStrikeThrough = function () {
    document.execCommand('strikeThrough', false, null);
}

RE.setUnderline = function () {
    document.execCommand('underline', false, null);
}

RE.setBullets = function () {
    document.execCommand('insertUnorderedList', false, null);
}

RE.setNumbers = function () {
    document.execCommand('insertOrderedList', false, null);
}

RE.setTextColor = function (color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('foreColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setTextBackgroundColor = function (color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('hiliteColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setFontSize = function (fontSize) {
    document.execCommand("fontSize", false, fontSize);
}

RE.setHeading = function (heading) {
    document.execCommand('formatBlock', false, '<h' + heading + '>');
}

RE.setIndent = function () {
    document.execCommand('indent', false, null);
}

RE.setOutdent = function () {
    document.execCommand('outdent', false, null);
}

RE.setJustifyLeft = function () {
    document.execCommand('justifyLeft', false, null);
}

RE.setJustifyCenter = function () {
    document.execCommand('justifyCenter', false, null);
}

RE.setJustifyRight = function () {
    document.execCommand('justifyRight', false, null);
}

RE.setBlockquote = function () {
    document.execCommand('formatBlock', false, '<blockquote>');
}

RE.insertImage = function (url, alt) {
    var html = '<img src="' + url + '" alt="' + alt + '" />';
    RE.insertHTML(html);
}

RE.insertImageEx = function (url, alt, style) {
    var html = '<img src="' + url + '" alt="' + alt + '" style="' + style + '"/>';
    RE.insertHTML(html);
}

RE.insertTodo = function () {
    var html = '<input type=checkbox />';
    RE.insertHTML(html);
}

RE.insertTable = function (row, column) {
    var html = '<table><tr><td> </td><td> </td><td> </td</tr><tr><td> </td><td> </td><td> </td</tr>';
    RE.insertHTML(html);
}

RE.insertImageW = function (url, alt, width) {
    var html = '<img src="' + url + '" alt="' + alt + '" width="' + width + '"/>';
    RE.insertHTML(html);
}

RE.insertImageWH = function (url, alt, width, height) {
    var html = '<img src="' + url + '" alt="' + alt + '" width="' + width + '" height="' + height + '"/>';
    RE.insertHTML(html);
}

RE.insertVideo = function (url, alt) {
    var html = '<video src="' + url + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertVideoW = function (url, width) {
    var html = '<video src="' + url + '" width="' + width + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertVideoWH = function (url, width, height) {
    var html = '<video src="' + url + '" width="' + width + '" height="' + height + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertAudio = function (url, alt) {
    var html = '<audio src="' + url + '" controls>录音</audio><br>';
    RE.insertHTML(html);
}

RE.insertYoutubeVideo = function (url) {
    var html = '<iframe width="100%" height="100%" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertYoutubeVideoW = function (url, width) {
    var html = '<iframe width="' + width + '" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertYoutubeVideoWH = function (url, width, height) {
    var html = '<iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertHTML = function (html) {
    RE.restorerange();
    document.execCommand('insertHTML', false, html);
}

RE.insertLink = function (url, title) {
    RE.restorerange();
    var sel = document.getSelection();
    if (sel.toString().length == 0) {
        document.execCommand("insertHTML", false, "<a href='" + url + "'>" + title + "</a>");
    } else if (sel.rangeCount) {
        var el = document.createElement("a");
        el.setAttribute("href", url);
        el.setAttribute("title", title);

        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    RE.callback();
}

RE.setTodo = function (text) {
    var html = '<input type="checkbox" name="' + text + '" value="' + text + '"/> &nbsp;';
    document.execCommand('insertHTML', false, html);
    recOpen();

}

RE.prepareInsert = function () {
    RE.backuprange();
}

RE.backuprange = function () {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        RE.currentSelection = {
            "startContainer": range.startContainer,
            "startOffset": range.startOffset,
            "endContainer": range.endContainer,
            "endOffset": range.endOffset
        };
    }
}

var port;

onmessage = function (e) {
    port = e.ports[0];
    console.log("OnMessage: " + e);
    port.onmessage = function (f) {
        console.log("onmessage: " + JSON.parse(f.data)['height']);
    }
};


RE.restorerange = function () {
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.setStart(RE.currentSelection.startContainer, RE.currentSelection.startOffset);
    range.setEnd(RE.currentSelection.endContainer, RE.currentSelection.endOffset);
    selection.addRange(range);
}

RE.enabledEditingItems = function (e) {
    var items = [];
    if (document.queryCommandState('bold')) {
        items.push('bold');
    }
    if (document.queryCommandState('italic')) {
        items.push('italic');
    }
    if (document.queryCommandState('subscript')) {
        items.push('subscript');
    }
    if (document.queryCommandState('superscript')) {
        items.push('superscript');
    }
    if (document.queryCommandState('strikeThrough')) {
        items.push('strikeThrough');
    }
    if (document.queryCommandState('underline')) {
        items.push('underline');
    }
    if (document.queryCommandState('insertOrderedList')) {
        items.push('orderedList');
    }
    if (document.queryCommandState('insertUnorderedList')) {
        items.push('unorderedList');
    }
    if (document.queryCommandState('justifyCenter')) {
        items.push('justifyCenter');
    }
    if (document.queryCommandState('justifyFull')) {
        items.push('justifyFull');
    }
    if (document.queryCommandState('justifyLeft')) {
        items.push('justifyLeft');
    }
    if (document.queryCommandState('justifyRight')) {
        items.push('justifyRight');
    }
    if (document.queryCommandState('insertHorizontalRule')) {
        items.push('horizontalRule');
    }
    var formatBlock = document.queryCommandValue('formatBlock');
    if (formatBlock.length > 0) {
        items.push(formatBlock);
    }

    window.location.href = "re-state://" + encodeURI(items.join(','));
}

RE.focus = function () {
    var range = document.createRange();
    range.selectNodeContents(RE.editor);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    RE.editor.focus();
}

RE.blurFocus = function () {
    RE.editor.blur();
}

RE.removeFormat = function () {
    document.execCommand('removeFormat', false, null);
}

var drawPanels = new Map();

RE.insertCanvas = function (canvasId) {
    //     <canvas id="c1" style="border:1px solid #aaa"></canvas>
    var html = '<canvas id="' + canvasId + '" style="border:1px solid #aaa" /><br></br>';
    RE.insertHTML(html);
    var canvasCard = new fabric.Canvas(canvasId, {
        isDrawingMode: true
    });
    canvasCard.setWidth(1260);
    canvasCard.setHeight(200);
    canvasCard.freeDrawingBrush = new fabric['PencilBrush'](canvasCard);
    let brush = canvasCard.freeDrawingBrush;
    brush.color = "#111"
    brush.width = 1;
    drawPanels.set(canvasId, canvasCard);
}

RE.loadCanvas = function (canvasId, json) {
    var canvasCard = new fabric.Canvas(canvasId, {
        isDrawingMode: true,
        allowTouchScrolling: false
    });
    canvasCard.setWidth(1260);
    canvasCard.setHeight(200);
    canvasCard.loadFromJSON(json, canvasCard.renderAll.bind(canvasCard), null);
    console.log("loadCanvas: " + canvasId);
    drawPanels.set(canvasId, canvasCard);
}

RE.getCanvasJson = function (canvasId) {
    for (var [key, value] of drawPanels) {
        if (key == canvasId) {
            return value.toJSON();
        }
    }
    return "";
}

RE.getCanvasIds = function () {
    console.log("getCanvasIds");
    let elements = document.all;
    let ids = [];
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.tagName == "CANVAS" && element.id != '') {
            ids.push(element.id);
        }
    }
    return ids;
}

RE.usePencil = function () {

}

RE.useEraser = function () {
    for (let [key, value] in drawPanels) {
        value.freeDrawingBrush = new fabric['EraserBrush'](value);
        value.freeDrawingBrush.width = 10;
    }
}

var recorder;
var recordFilePath;
RE.startRecord = function (filePath) {
    console.log("startRecord");
    recordFilePath = filePath;
    startRecording();
    console.log("startRecord start");
}

RE.stopRecord = function () {
    console.log("stopRecord");
    stopRecording();
}

// Event Listeners
RE.editor.addEventListener("input", RE.callback);
RE.editor.addEventListener("keyup", function (e) {
    var KEY_LEFT = 37, KEY_RIGHT = 39;
    if (e.which == KEY_LEFT || e.which == KEY_RIGHT) {
        RE.enabledEditingItems(e);
    }
});

// recorder
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var recorder; 						//MediaRecorder object
var chunks = [];					//Array of chunks of audio data from the browser
var extension;

// true on Chrome, true on Firefox > 62, false on Firefox <= 62
console.log("audio/webm:" + MediaRecorder.isTypeSupported('audio/webm;codecs=opus'));
// false on Chrome, true on Firefox
console.log("audio/ogg:" + MediaRecorder.isTypeSupported('audio/ogg;codecs=opus'));

if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
    extension = "webm";
} else {
    extension = "ogg"
}

function startRecording() {
    console.log("recordButton clicked");
    var constraints = {
        audio: true
    };
    var promise = navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        console.log("getUserMedia() success, stream created, initializing MediaRecorder");

        gumStream = stream;
        var options = {
            audioBitsPerSecond: 128000,
            mimeType: 'audio/' + extension + ';codecs=opus'
        }

        console.log("formats: Sample rate: 48kHz, MIME: audio/" + extension + ";codecs=opus");

        recorder = new MediaRecorder(stream, options);

        //when data becomes available add it to our attay of audio data
        recorder.ondataavailable = function (e) {
            console.log("recorder.ondataavailable:" + e.data);

            console.log("recorder.audioBitsPerSecond:" + recorder.audioBitsPerSecond)
            console.log("recorder.videoBitsPerSecond:" + recorder.videoBitsPerSecond)
            console.log("recorder.bitsPerSecond:" + recorder.bitsPerSecond)
            // add stream data to chunks
            chunks.push(e.data);
            // if recorder is 'inactive' then recording has finished
            if (recorder.state == 'inactive') {
                // convert stream data chunks to a 'webm' audio format as a blob
                const blob = new Blob(chunks, { type: 'audio/' + extension, bitsPerSecond: 128000 });
                createDownloadLink(blob)
            }
        };

        recorder.onerror = function (e) {
            console.log(e.error);
        }

        //start recording using 1 second chunks
        //Chrome and Firefox will record one long chunk if you do not specify the chunck length
        recorder.start(1000);
        console.log("recorder start...");
        //recorder.start();
    }).catch(function (err) {
        console.log("exception: " + err)
    });
}

function pauseRecording() {
    console.log("pauseButton clicked recorder.state=", recorder.state);
    if (recorder.state == "recording") {
        recorder.pause();
    } else if (recorder.state == "paused") {
        recorder.resume();
    }
}

function stopRecording() {
    console.log("stopButton clicked");
    //tell the recorder to stop the recording
    recorder.stop();
    //stop microphone access
    gumStream.getAudioTracks()[0].stop();
}

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    console.log("start save content: " + recordFilePath);
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        console.log("loaded ok: " + reader.result);
        var message = {
            callBack: "onAudioRecorded",
            info: {
                fileName: recordFilePath,
                data: reader.result
            }
        }
        port.postMessage(JSON.stringify(message));
        URL.revokeObjectURL(url);
    };
}


RE.editor.addEventListener("click", RE.enabledEditingItems);
