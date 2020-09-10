/**
 * @file Bereitet die variabeln vor und startet das Spiel
 * @module main
 */

const pause = false;
var bbug = false;
const debug = false;

const SCATTER = 0;
const CHASE = 1;

const origPath = false;

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

/**
 * Die Variabel beschreibt den Abstand nach links
 * @constant {number}   constXOffset
 */
const constXOffset = (pWidth - (spalten * tilesize)) / 2;

/**
 * Die Variabel beschreibt den Abstand nach oben
 * @constant {number}   constYOffset
 */
const constYOffset = 80;

/**
 * Die Variabel zum Zugriff auf die Klasse {@link canvasClass}
 * @constant {canvasClass} c
 */

const canvasWidth = tilesize * spalten + 2 * constXOffset;
const canvasHeight = tilesize * zeilen + 2 * constYOffset;

document.getElementById("left").style.width = "100%";

const c = new canvasClass("canvas", canvasWidth, canvasHeight, "black");

/**
 * Die Variabel in der das aktuelle Level gespeichert wird
 * @var {level} lvl
 * @example
 * var lvl = new level(grid);
 */
var lvl;
/**
 * Das Array in dem die Geister und Pacman gespeichert werden
 * @var {obj[]} objects
 * @example
 * //Der Beispielcode, fügt Pacman der Liste hinzu und zeichnet ihn.
 * var objects = [];
 * objects.push(new pacman(1.5 * tilesize, 1.5 * tilesize));
 * objects[0].draw();
 */
var objects;
/**
 * Die Variabel in der Pacman gespeichert wird
 * @var {pacman} vPacman
 * @example
 * var vPacman = new pacman(1.5 * tilesize, 1.5 * tilesize);
 */
var vPacman;

var vBlinky;

var points = 0;
/**
 * Die Variabel in der der Intervall mit dem Gameloop gespeichert wird
 * @var {Intervall} gameLoop
 * @example
 * var gameLoop = gameLoop = setInterval(tick, 10);
 */
var gameLoop;
/**
 * Die Variabel in der gespeichert wird ob das Spiel läuft
 * @var {boolean} running
 */
var running = false;

/**
 * lvlIndex gibt die aktuelle Levelnummer an.
 * @var {number} lvlIndex
 */
var lvlIndex = 0;

var lvlList = ["./level/lvl1.json", "./level/lvl2.json", "./level/lvl3.json", "./level/lvl4.json"];


var _lvl1;

const times = [];
var fps;
var minFPS = Infinity;
var maxFPS = 0;
var frameTime = 0;
var time;
var showFPS = false;

function mainMenu() {
    c.cls();
    if (keyCodes[" "]) {
        cancelAnimationFrame(gameLoop);
        setTimeout(init, 500);
        return;
    }
    c.fillText(canvasWidth / 3, canvasHeight / 2, "Press space to start", "50px Times New Roman", "white");
    gameLoop = requestAnimationFrame(mainMenu);
}

/**
 * Initialisiert die Variabeln und startet das Spiel
 * @example init();
 */

function init() {

    //loadLevel("{\"grid\":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],[1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],[1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1],[1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1],[1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],[1,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1],[1,0,1,1,0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,1,0,1,1,0,1],[1,0,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],[1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1],[1,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,0,1],[1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],\"pacmanStart\":{\"x\":1,\"y\":1},\"blinkyStart\":{\"x\":1,\"y\":5},\"clydeStart\":{\"x\":10,\"y\":5},\"speedyStart\":{\"x\":10,\"y\":10},\"inkyStart\":{\"x\":10,\"y\":10},\"identification\":1}");
    lvlIndex = 0;
    time = performance.now();
    loadJSON(lvlList[lvlIndex], function (json) {
        loadLevel(json);
    });

}

function reset() {
    stop();
    init();
}

/**
 * Die Funktion wird alle 10ms ausgeführt und aktualisiert die Geister, Pacman sowie den Bildschirm
 */
function tick() {
    frameTime = (performance.now() - time) / 1000;
    time = performance.now();
    if (keyCodes["w"] || keyCodes["ArrowUp"])
        key = "up";
    else if (keyCodes["s"] || keyCodes["ArrowDown"])
        key = "down";
    else if (keyCodes["a"] || keyCodes["ArrowLeft"])
        key = "left";
    else if (keyCodes["d"] || keyCodes["ArrowRight"])
        key = "right";
    if (keyCodes["r"]) {
        keyCodes["r"] = false;
        reset();
    }
    if (keyCodes["f"]) {
        keyCodes["f"] = false;
        showFPS = !showFPS;
    }
    if (!pause) {
        c.cls();
        c.fillArray(lvl.grid, ["black", lvl.color, "red"], tilesize, tilesize, constXOffset, constYOffset);
        c.fillText(constXOffset, constYOffset, "Score: " + points, "20px Arial", "white");
        c.fillText(constXOffset + (canvasWidth - constXOffset * 1.15) / 2, constYOffset, "Lives: 3", "20px Arial", "white");
        bug();
    }
    if (lvl.coins[xyToI(vPacman.cell.x, vPacman.cell.y, spalten)]) {
        lvl.coins[xyToI(vPacman.cell.x, vPacman.cell.y, spalten)] = false;
        lvl.coinAnzahl--;
        points++;
    }
    objects.forEach(element => {
        if (!pause) {
            try {
                element.move();
            } catch (error) {
                //console.log(element.name);
            }
        }
        element.draw();
    });
    for (let i = 1; i < objects.length; i++) {
        if (!debug && objects[i].cell.cmp(vPacman.cell)) {
            stop();
            alert("Du hast verloren.");
        }
    }
    if (lvl.coinAnzahl == 0)
        nextLevel();
    if (showFPS)
        drawFPS();
    calculateFPS();
    gameLoop = requestAnimationFrame(tick);
}

/**
 * Lädt das nächste Level
 */
function nextLevel() {
    stop();
    if (lvlIndex == 256)
        bbug = true;
    else
        bbug = false;
    loadJSON(lvlList[lvlIndex % lvlList.length], loadLevel);
}

function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var ghostMode;

/**
 * Die Funktion lädt aus einem Object oder einer JSON Datei das Level
 * @param {string | object} data Die Leveldaten
 */
function loadLevel(data) {
    if (typeof data === 'string')
        obj = JSON.parse(data);
    else
        obj = data;
    running = false;
    setTimeout(function (obj) {
        lvl = level.from(obj);
        objects = [];
        vPacman = new pacman(lvl.pacmanStart.x * tilesize + tilesize / 2, lvl.pacmanStart.y * tilesize + tilesize / 2);
        vBlinky = new blinky(lvl.blinkyStart.x * tilesize + tilesize / 2, lvl.blinkyStart.y * tilesize + tilesize / 2, 0, 1, vPacman);
        objects.push(vPacman);
        objects.push(vBlinky);
        objects.push(new clyde(lvl.clydeStart.x * tilesize + tilesize / 2, lvl.clydeStart.y * tilesize + tilesize / 2, 0, 1, vPacman));
        objects.push(new pinky(lvl.speedyStart.x * tilesize + tilesize / 2, lvl.speedyStart.y * tilesize + tilesize / 2, 0, 1, vPacman));
        objects.push(new inky(lvl.inkyStart.x * tilesize + tilesize / 2, lvl.inkyStart.y * tilesize + tilesize / 2, 1, 1, vPacman, vBlinky));
        running = true;
        //_logger_ = new objLog("debugText", objects);
        lvlIndex = lvl.identification;
        lvl.mode = CHASE;
        tick();
        lvl.mode = SCATTER;
        tick();
        ghostMode = setTimeout((t) => {
            console.log("CHASE");
            lvl.mode = CHASE;
            ghostMode = setTimeout((t) => {
                if (t != lvlIndex)
                    return;
                console.log("SCATTER");
                objects.forEach(element => {
                    if (element.name != "Pacman")
                        element.velocity.mul(-1);
                });
                lvl.mode = SCATTER;
                ghostMode = setTimeout((t) => {
                    if (t != lvlIndex)
                        return;
                    console.log("CHASE");
                    lvl.mode = CHASE;
                    ghostMode = setTimeout((t) => {
                        if (t != lvlIndex)
                            return;
                        console.log("SCATTER");
                        objects.forEach(element => {
                            if (element.name != "Pacman")
                                element.velocity.mul(-1);
                        });
                        lvl.mode = SCATTER;
                        ghostMode = setTimeout((t) => {
                            if (t != lvlIndex)
                                return;
                            console.log("CHASE");
                            lvl.mode = CHASE;
                            ghostMode = setTimeout((t) => {
                                if (t != lvlIndex)
                                    return;
                                console.log("SCATTER");
                                objects.forEach(element => {
                                    if (element.name != "Pacman")
                                        element.velocity.mul(-1);
                                });
                                lvl.mode = SCATTER;
                                ghostMode = setTimeout((t) => {
                                    if (t != lvlIndex)
                                        return;
                                    console.log("CHASE");
                                    lvl.mode = CHASE;
                                }, 5000, t);
                            }, 20000, t);
                        }, 5000, t);
                    }, 20000, t);
                }, 7000, t);
            }, 20000, t);
        }, 7000, lvlIndex);
        gameLoop = requestAnimationFrame(tick);
    }, 50, obj);
}

function stop() {
    clearTimeout(ghostMode);
    cancelAnimationFrame(gameLoop);
    running = false;
    objects = null;
}

var bImg = null;
var bCanvas = document.createElement("canvas");
bCanvas.setAttribute("width", canvasWidth);
bCanvas.setAttribute("height", canvasHeight);
var bCtx = bCanvas.getContext("2d");

function bug() {
    if (bImg === null) {
        bImg = new Image();
        //Quellen: https://www.pinterest.com/pin/462393086712054233/ http://kafumble.blogspot.com/2011/05/pacman.html 
        bImg.src = ".\\img\\BugSprites.jpg";
        bImg.onload = function () {
            createBug();
        };
    }
    if (bbug) {
        //bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);
        c.ctx.drawImage(bCanvas, 0, 0);
    }
}


function createBug() {
    bCtx.fillRect(c.width / 2, 0, c.width, c.height);
    for (let i = 0; i < 256; i++) {
        let ix = random.getRandomInt(0, bImg.width);
        let iy = random.getRandomInt(0, bImg.height);
        let x = random.getRandomInt(c.width / 2, c.width - constXOffset);
        let y = random.getRandomInt(constYOffset, c.height - constYOffset);
        bCtx.drawImage(bImg, ix, iy, tilesize, tilesize, x, y, tilesize, tilesize);
    }
}

/**
 * Testet {@link level#grid|grid} auf fehlgesetzte Wände und ruft sich selbst, wenn {@link running} wahr ist, asynchron alle 25ms selbst auf
 * @param {number[][]} pGrid Das Referenzfeld
 * @param {number} t Muss beim ersten Aufruf 0 sein
 * @deprecated Die Funktion ist nicht mehr nötig, da der keine Wände mehr erscheinen
 */
function testGrid(pGrid, t) {
    let tmp;
    if (t == 0)
        tmp = arrayClone(pGrid);
    else
        tmp = pGrid;
    for (let y = 1; y < tmp.length - 1; y++) {
        for (let x = 1; x < tmp[0].length - 1; x++) {
            if (lvl.grid[y][x] == 1 && tmp[y][x] != 1)
                lvl.grid[y][x] = 0;
        }
    }
    if (running)
        setTimeout(testGrid, 25, tmp, 1);
}

function calculateFPS() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    if (fps < minFPS && now >= 2000)
        minFPS = fps;
    if (fps > maxFPS)
        maxFPS = fps;

}

function drawFPS() {
    c.fillText(canvasWidth - 80, 25, "FPS: " + fps, "13px Times New Roman", "white");
    c.fillText(canvasWidth - 80, 45, "Max. FPS: " + maxFPS, "13px Times New Roman", "white");
    c.fillText(canvasWidth - 80, 65, "Min. FPS: " + minFPS, "13px Times New Roman", "white");
    c.fillText(canvasWidth - 80, 85, "TPF: " + frameTime, "13px Times New Roman", "white");
}

detectSwipe('left', setKey);
mainMenu();