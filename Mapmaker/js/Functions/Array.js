/**
 * @file Stellt Funktionen zum bearbeiten und zugreifen auf Arrays zur verfügung
 * @module array.js
 */
/**
 * Die Funktion kopiert ein n-Dimensionales Array
 * @param {Array} arr Das zu kopierende n-Dimensionale Array
 * @returns {Array} Das kopierte Array
 */
function arrayClone(arr) {
    var i, copy;
    if (Array.isArray(arr)) {
        copy = arr.slice(0);
        for (i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
        }
        return copy;
    } else if (typeof arr === "object") {
        //Fehler wenn das Array ein Object ist
        throw "Cannot clone array containing an object!";
    } else {
        return arr;
    }
}

/**
 * Berechnet aus x/y Koordinaten den Index für ein 1-Dimensionales Array
 * @param {number} x 
 * @param {number} y 
 * @return {number} Der Index
 */
function xyToI(x, y, width) {
    return y * width + x;
}


function findCell(pGrid, pX, pY, i) {
    let a = 1;
    while (true) {
        for (let x = 0 - a; x <= 0 + a; x++) {
            for (let y = 0 - a; y <= 0 + a; y++) {
                if (pGrid[pY + y][pX + x] === null || pGrid[pY + y][pX + x] === undefined)
                    continue;
                if (pGrid[pY + y][pX + x] != i)
                    return new vector2D(pY + y, pX + x);
            }
        }
        a++;
    }
}

function generateArray(w, h, c) {
    let temp = [
        []
    ];
    for (let i = 0; i < w; i++) {
        temp[0].push(c);
    }
    for (let i = 0; i < h - 1; i++) {
        temp.push(arrayClone(temp[0]));
    }
    return temp;
}

function mirror() {
    for (let y = 1; y < lvl.grid.length - 1; y++) {
        for (let x = 1; x < lvl.grid[0].length - 1; x++) {
            lvl.grid[y][(lvl.grid[0].length - 1) - x] = lvl.grid[y][x];
        }
    }
}