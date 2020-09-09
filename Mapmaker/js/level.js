/**
 * @file Die Klasse speichert die Daten für verschiedene Level
 */
class level {
    /**
     * 
     * @param {number[][]} grid Das grid stellt die Tilemap dar.
     * @param {number} [id=null] Die Id ist die Levelnummer.
     */
    constructor(grid, pX, pY, bX, bY, cX, cY, sX, sY, iX, iY, color = "blue",id = null) {
        /**
         * @member {number[][]} level~grid Die Tilemap ist eine vereinfachte Darstellung des Levels, in der Wände mit einer 1 dargestellt werden
         */
        this.grid = grid;
        /**
         * @member {number} level~identification Die Identification Nummer ist die Nummer, die Angibt an welcher Stelle das Level ist.
         */

        this.pacmanStart = new vector2D(pX, pY);

        this.blinkyStart = new vector2D(bX, bY);

        this.clydeStart = new vector2D(cX, cY);

        this.speedyStart = new vector2D(sX, sY);

        this.inkyStart = new vector2D(iX, iY);

        this.identification = id;
        
        this.color = color;

        this.coins = new Array(zeilen*spalten);
        this.coins.fill(false);

        this.coinAnzahl = 0;
    }

    static from(json) {
        return Object.assign(new level(), json);
    }

    /**
     * Der getter id gibt die Levelnummer zurück
     * @return {number}
     */
    get id() {
        return this.identification;
    }
}