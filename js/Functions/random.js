/**
 * @file Stellt verschiedene Methoden zum generieren von Zufallszahlen und Kombinationen mit der Klasse {@link random} zur verfügung
 */

class random {
    /**
     * Der constructor wird nicht benötigt, da alle Methoden Statisch sind
     * @param {number} seed Der Startwert
     */
    constructor(seed) {
        this.seed = seed;
    }
/**
 * Erzeugt eine Pseudo-Zufallszahl Quelle: {@link https://gist.github.com/blixt/f17b47c62508be59987b#gistcomment-2327776}
 * @param {number} min Die kleinstmögliche Zahl
 * @param {number} max Die Größtmögliche Zahl
 */
    SingetRandomInt(min, max) {
        let x = Math.sin(this.seed++) * 10000;
        return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    }

    /**
     * Die Funktion generiert eine Zufallszahl in einem vorgegebenen Bereich.
     * @param {number} min Die kleinstmögliche Zahl, die generiert werden kann
     * @param {number} max Die größte Zahl, die generiert werden kann
     * @return {number} Die generierte Zufallszahl
     * @example 
     * var rndInt = random.getRandomInt(15,50);
     * var rndFlt = random.getRandomInt(15.0,50.0);
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Die funktion generiert eine zufällige RGB-Farbe. Das beispiel färbt das canvas der {@link canvasClass} in einer Zufallsfarbe.
     * @return {string} Die Farbe im Format rgb(r,g,b)
     * @example
     * var c = new canvasClass("canvas", 600, 400);
     * c.background = random.getRandomColor();
     */
    static getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    /**
     * Die Funktion gibt einen zufälligen Buchstaben zurück
     * @return {char} Den Zufälligen Char
     * @example console.log(random.getRandomLetter);
     */
    static getRandomLetter() {
        return String.fromCharCode(97 + random.getRandomInt(0, 26));; //'abcdefghijklmnopqrstuvwxyz'.charAt(code);
    }

    /**
     * Die Funktion gibt einen zufälligen String in der gegebenen Länge zurück
     * @param {number} length Die Länge des Strings
     * @return {string} Der zufällige String
     * @example
     * //Das Beispiel gibt einen String der Länge 10 aus
     * console.log(random.getRandomString(10));
     */
    static getRandomString(length) {
        let tmp = "";
        for (let i = 0; i < length; i++) {
            tmp += random.getRandomLetter();
        }
        return tmp;
    }
}