/**
 * Gibt die größe der einzelnen Felder an
 * @constant {number} tilesize
 */
const tilesize = 20;

/**
 * @constant {number} pWidth Ist die Breite des Fensters
 */
const pWidth = window.innerWidth;
/**
 * @constant {number} pHeight Ist die Höhe des Fensters
 */
const pHeight = window.innerHeight;

/**
 * Gibt die Anzahl der Zeilen an
 * @constant {number} zeilen
 */
const zeilen = 31;
/**
 * Gibt die Anzahl der Spalten an
 * @constant {number} spalten
 */
const spalten = 28;

const c = new canvasClass("canvas", spalten * tilesize, zeilen * tilesize, "white");

var cell = 1;

var lvl;


var wallColor = document.getElementById("colorPicker").value;

function init() {
    lvl = new level(generateArray(spalten, zeilen, 0), null, null, null, null, null, null, null, null, null, null, "blue", 0);
    lvl.grid[0].fill(1);
    lvl.grid[zeilen - 1].fill(1);
    for (let y = 1; y < zeilen - 1; y++) {
        lvl.grid[y][0] = 1;
        lvl.grid[y][spalten - 1] = 1;
    }
}


function draw() {
    if (mouseDown)
        switchCell();
    //c.cls();
    c.fillArray(lvl.grid, ["black", wallColor, "red"]);
    c.drawCell(mPos.x, mPos.y, "white");
    c.fillCell(lvl.pacmanStart.x, lvl.pacmanStart.y, "yellow");
    c.fillCell(lvl.blinkyStart.x, lvl.blinkyStart.y, "red");
    c.fillCell(lvl.speedyStart.x, lvl.speedyStart.y, "pink");
    c.fillCell(lvl.inkyStart.x, lvl.inkyStart.y, "blue");
    c.fillCell(lvl.clydeStart.x, lvl.clydeStart.y, "orange");
    document.getElementById("pos").innerHTML = "Position: " + mPos.x + ", " + mPos.y;
}

function changeColor() {
    wallColor = document.getElementById("colorPicker").value;
}

function toCell(x, y) {
    return new vector2D(Math.floor(x / tilesize), Math.floor(y / tilesize));
}

function switchCell() {
    if (mouseX > 0 && mouseX < c.width && mouseY > 0 && mouseY < c.height) {
        if (cell == 0 || cell == 1)
            lvl.grid[mPos.y][mPos.x] = cell;
        else if (cell == 2)
            lvl.pacmanStart = mPos;
        else if (cell == 3)
            lvl.blinkyStart = mPos;
        else if (cell == 4)
            lvl.speedyStart = mPos;
        else if (cell == 5)
            lvl.inkyStart = mPos;
        else if (cell == 6)
            lvl.clydeStart = mPos;
    }
}

function fill(x, y, c) {
    if (lvl.grid[y][x] == c) {
        lvl.grid[y][x] = (c == 0 ? 1 : 0);
        //Mit Diagonal
        /*
        for (let _y = -1; _y <= 1; _y++) {
            for (let _x = -1; _x <= 1; _x++) {
                setTimeout(fill, 25, x + _x, y + _y, c);
            }
        }
        */
        //Nicht Diagonal
        //Rechts
        setTimeout(fill, 25, x + 1, y, c);
        //Unten
        setTimeout(fill, 25, x, y + 1, c);
        //Links
        setTimeout(fill, 25, x - 1, y, c);
        //Oben
        setTimeout(fill, 25, x, y - 1, c);
    }
}

function setCoins(x, y, c) {
    if (lvl.grid[y][x] == c && lvl.coins[xyToI(x, y, spalten)] == false) {
        lvl.coins[xyToI(x, y, spalten)] = true;
        lvl.coinAnzahl++;
        //Mit Diagonal
        /*
        for (let _y = -1; _y <= 1; _y++) {
            for (let _x = -1; _x <= 1; _x++) {
                setTimeout(setCoins, 25, x + _x, y + _y, c);
            }
        }
        */
        //Nicht Diagonal
        //Rechts
        setTimeout(setCoins, 25, x + 1, y, c);
        //Unten
        setTimeout(setCoins, 25, x, y + 1, c);
        //Links
        setTimeout(setCoins, 25, x - 1, y, c);
        //Oben
        setTimeout(setCoins, 25, x, y - 1, c);
    }
}

function downloadObjectAsJson(exportObj, exportName) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", exportName + ".json");
    document.body.appendChild(a);
    a.click();
    a.remove();
    let waende = 0;
    let weg = 0;
    for (let y = 0; y < lvl.grid.length; y++) {
        for (let x = 0; x < lvl.grid[0].length; x++) {
            if (lvl.grid[y][x] == 1) {
                waende++;
            } else {
                weg++;
            }
        }
    }
    document.getElementById("debug").innerHTML = "Münzen: " + lvl.coinAnzahl + "\n";
    document.getElementById("debug").innerHTML += "Wege: " + weg + "\n";
    document.getElementById("debug").innerHTML += "Wände: " + waende + "\n";
}


function loadLevel(data) {
    if (typeof data === 'string')
        obj = JSON.parse(data);
    else
        obj = data;
    lvl = level.from(obj);
}

function sCoins() {
    lvl.coins.fill(false);
    lvl.coinAnzahl = 0;
    for (let y = 0; y < lvl.grid.length; y++) {
        for (let x = 0; x < lvl.grid[0].length; x++) {
            if (lvl.grid[y][x] == 0) {
                setTimeout(() => {
                    lvl.coins[xyToI(x, y, spalten)] = true;
                    lvl.coinAnzahl++;
                }, 500);
                wait(1);
            }
        }
    }
}


init();

var drawIntervall = setInterval(draw, 2);