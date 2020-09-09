/**
 * @file Stellt Funktionen zum Zugriff auf die Maus zur verfügung.
 * @module mouse.js
 */

/**
 * @var mouseX Die x-Position der Maus 
 * @type {number}
 */
var mouseX = 0;

/**
 * @var mouseY Die y-Position der Maus
 * @type {number}
 */
var mouseY = 0;

var mPos;

/**
 * @var mouseDown Die Variabel speichert, ob eine der Maustasten gedrückt ist
 * @type {boolean}
 * @example
 * if(mouseDown)
 *      console.log("Eine Maustaste wurde gedrückt");
 * else
 *      console.log("Es wurde keine Taste gedrückt");
 * //Kürzer:
 * console.log(mouseDown ? "Eine Maustaste wurde gedrückt" : "Es wurde keine Taste gedrückt")
 */
var mouseDown = 0;
var mouseButton;
var mTemp;
document.body.onmousedown = function (evt) {
    mouseDown = 1;
    mouseButton = evt.button;
    switch (evt.button) {
        case 1:
            fill(mPos.x, mPos.y, lvl.grid[mPos.y][mPos.x]);
            break;
        case 2:
            mTemp = cell;
            cell = 0;
            break;
    }
}

document.body.onmouseup = function (evt) {
    mouseDown = 0;
    if (evt.button == 2)
        cell = mTemp;
    mouseButton = null;
}
//Die Funktion wird ausgeführt wenn die Maus bewegt wird.
function updateMouse(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    if ((c !== null || c !== undefined) && (mouseX < c.width && mouseX >= 0) && (mouseY < c.height && mouseY >= 0)) {
        mPos = toCell(mouseX, mouseY);
    }
}