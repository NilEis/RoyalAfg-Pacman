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

/**
 * Findet die nächste Zelle die nicht i enthählt
 * @param {Array[][]} pGrid Das zu durchsuchende Array
 * @param {number} pX Die x-Startposition
 * @param {number} pY Die y-Startposition
 * @param {*} i Das zu vermeidende Zeichen
 */
function findCell(pGrid, pX, pY, i) {
    let a = 1;
    while (true) {
        for (let x = 0 - a; x <= 0 + a; x++) {
            for (let y = 0 - a; y <= 0 + a; y++) {
                if(pGrid[pY+y][pX+x] === null || pGrid[pY+y][pX+x] === undefined)
                    continue;
                if(pGrid[pY + y][pX + x] != i)
                    return new vector2D(pY+y, pX+x);
            }
        }
        a++;
    }
}

/**
 * Die methode mischt ein Array
 * @param {Array} arra1 Das zu mischende Array
 */
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    //Wiederhole solange Elemente in der Liste sind
    while (ctr > 0) {
        //Wähle einen Zufälligen Index
        index = Math.floor(Math.random() * ctr);
        ctr--;
        //Wechsel das letzte Element mit dem aktiven
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}