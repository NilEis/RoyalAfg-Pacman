/**
 * @file Die Klasse speichert die Daten für verschiedene Level
 */
class level {

    /**
     * 
     * @param {number[][]} grid Die tilemap
     * @param {number} pX Die x-Startposition von Pacman
     * @param {number} pY Die y-Startposition von Pacman
     * @param {number} bX Die x-Startposition von Blinky
     * @param {number} bY Die y-Startposition von Blinky
     * @param {number} cX Die x-Startposition von Clyde
     * @param {number} cY Die y-Startposition von Clyde
     * @param {number} sX Die x-Startposition von Pinky
     * @param {number} sY Die y-Startposition von Pinky
     * @param {number} iX Die x-Startposition von Inky
     * @param {number} iY Die y-Startposition von Inky
     * @param {string} [color="blue"] Die Farbe des Levels
     * @param {number} [id=null] Die Id
     */
    constructor(grid, pX, pY, bX, bY, cX, cY, sX, sY, iX, iY, color = "blue", id = null) {
        /**
         * @member {number[][]} level~grid Die Tilemap ist eine vereinfachte Darstellung des Levels, in der Wände mit einer 1 dargestellt werden
         */
        this.grid = grid;

        /**
         * @member {vector2D} level~pacmanStart Die Startposition von pacman
         */
        this.pacmanStart = new vector2D(pX, pY);

        /**
         * @member {vector2D} level~blinkyStart Die Startposition von pacman
         */
        this.blinkyStart = new vector2D(bX, bY);

        /**
         * @member {vector2D} level~clydeStart Die Startposition von pacman
         */
        this.clydeStart = new vector2D(cX, cY);

        /**
         * @member {vector2D} level~speedyStart Die Startposition von pacman
         */
        this.speedyStart = new vector2D(sX, sY);

        /**
         * @member {vector2D} level~inkyStart Die Startposition von pacman
         */
        this.inkyStart = new vector2D(iX, iY);

        /**
         * @member {number} level~identification Die Identification Nummer ist die Nummer, die Angibt an welcher Stelle das Level ist.
         */
        this.identification = id;

        /**
         * @member {string} level~color Die Farbe die das Level haben soll
         */
        this.color = color;

        /**
         * @member {number[]} level~coins Ein Array in dem für jede Position gespeichert wird ob sich dort eine Münze befindet
         */
        this.coins = new Array(zeilen * spalten);
        this.coins.fill(false);

        /**
         * @member {number} level~coinAnzahl Die Anzahl an Münzen im Level
         */
        this.coinAnzahl = 0;

        /**
         * @member {string} [level~name = "Level"] Der Name dieser Klasse
         * @private
         */
        this.name = "Level"

        /**
         * @member {number} level~mode Die Art der Zielbestimmung der Geister
         */
        this.mode = null;
    }

    /**
     * Erstellt aus einem JavaScript eine Instanz der Klasse
     * @param {object} json Das Objekt aus dem die Klasse erstellt werden soll
     * @example
     * var level = level.from(JSON.parse(Jsonfile));
     */
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

    /**
     * Der getter gibt das Level als JSON-Objekt zurück.
     * @return {string} Das Level
     */
    get JSON() {
        return JSON.stringify(this);
    }

    /**
     * Diese Methode downloaded das Level als Json-Datei
     */
    downloadLevel() {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.JSON);
        let a = document.createElement('a');
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "level.json");
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}