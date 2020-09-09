/**
 * @file Stellt mathematische Funktionen zur verfügung
 * @module math.js
 */

/**
 * Konvertiert eine Zahl, aus einem Bereich in einen anderen Bereich
 * Vorbild dafür war die {@link https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L459|map} Funktion von {@link https://github.com/processing/p5.js|p5.js}.
 * @param {number} n Der Wert, der verändert werden soll    
 * @param {number} start1 Der Startwert des ersten Bereichs
 * @param {number} stop1 Der Endwert des ersten Bereichs
 * @param {number} start2 Der Startwert des zweiten Bereichs
 * @param {number} stop2 Der Endwert des zweiten Bereichs
 * @return {number} Die entsprechende Zahl im zweiten bereich
 * @example
 * var x = mapValue(0.5,0,1,0,10);
 * //Erwartete Ausgabe: 5
 */
function mapValue(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

/**
 * Die Funktion, testet ob ein Punkt oder Kreis ausserhalb eines Rechtecks ist
 * @param {vector2D} loc Die Position des Punktes
 * @param {vector} rect Die untere rechte Ecke des Rechtecks
 * @param {number} [r = 0] Der Radius, falls getestet werden soll ob ein Kreis ausserhalb des Rechtecks ist
 * @return {boolean}    True, wenn der Punkt ausserhalb des Rechteclks ist, sonst false
 */
function outOfBounds(loc, rect, r = 0) {
    if (loc.x + r > rect.x || loc.x - r < 0 || loc.y + r > rect.y || loc.y - r < 0)
        return true;
    return false;
}

/**
 * Die Funktion rechnet die Position eines Punktes in die entsprechende Position im {@link level#grid|grid} um.
 * @param {vector2D} loc Die position die zu einer Zellenkoordinate umgerechnet werden soll
 * @return {vector2D} Die Position im {@link level#grid|grid}
 */
function toCell(loc) {
    let x = Math.floor(loc.x / tilesize);
    let y = Math.floor(loc.y / tilesize);
    return new vector2D(x, y);
}

/**
 * Die Funktion berechnet die {@link https://de.wikipedia.org/wiki/Manhattan-Metrik | Manhatten Distanz} zwische zwei punkten
 * @param {number} sX Die x-Position des ersten Punktes
 * @param {number} sY Die y-Position des ersten Punktes
 * @param {number} dX Die x-Position des zweiten punktes
 * @param {number} dY Die y-Position des zweiten Punktes
 * @return {number} Die Entfernung zwischen den punkten
 */
function manhattenDistance(sX, sY, dX, dY) {
    let tempX = Math.abs(dX - sX);
    let tempY = Math.abs(dY - sY);
    return tempX + tempY;
}

/**
 * Die Funktion berechnet den {@link https://de.wikipedia.org/wiki/Euklidischer_Abstand | euklidischen Abstand} zweier Punkte
 * @param {number} sX Die x-Position des ersten Punktes
 * @param {number} sY Die y-Position des ersten Punktes
 * @param {number} dX Die x-Position des zweiten punktes
 * @param {number} dY Die y-Position des zweiten Punktes
 * @return {number} Die Entfernung zwischen den punkten
 */
function euclideanDistance(sX, sY, dX, dY) {
    let tempX = Math.abs(dX - sX);
    let tempY = Math.abs(dY - sY);
    return Math.sqrt((tempX * tempX) + (tempY * tempY));
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }