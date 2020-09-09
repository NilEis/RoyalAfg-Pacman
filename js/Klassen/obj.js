/**
 * Die klasse obj ist die Oberklasse von den Geistern und Pacman und stellt Grundfunktionen, sowie Variabeln zur verfügung
 * @file Stellt die Klasse {@link obj} zur verfügung
 */
class obj {
    /**
     * @param {string} img Das Bild, welches genutz werden soll
     * @param {number} xPos Die x-Startposition
     * @param {number} yPos Die y-Startposition
     * @param {number} xVel Die Startgeschwindigkeit in x-Richtung
     * @param {number} yVel Die Startgeschwindigkeit in y-Richtung
     */
    constructor(img, xPos, yPos, xVel, yVel) {
        /**
         * @member {Image} [obj~image=null] Das Bild, das dieser Character nutzen soll
         */
        this.image = new Image();
        /**
         * @member {vector2D} obj~location Der Positionsvektor ({@link vector2D}) des Characters
         */
        this.location = new vector2D(xPos, yPos);
        /**
         * @member {vector2D} obj~velocity Der Geschwindigkeitsvektor ({@link vector2D}) des Characters
         */
        this.velocity = new vector2D(xVel, yVel);
        if (img === null)
            this.image = null;
        else
            this.image.src = img;
        /**
         * @member {vector2D} obj~cell Der Positionsvektor ({@link vector2D}) des Characters konvertiert in die Position im {@link level#grid|grid} (Siehe: {@link toCell})
         */
        this.cell = toCell(this.location);
    }

    /**
     * Die Funktion zeichnet, wenn sie nicht überschrieben ist, den Character auf das Canvas.
     */
    draw() {
        c.drawImage(this.image, this.location.x - tilesize / 2 + constXOffset, this.location.y - tilesize / 2 + constYOffset, tilesize, tilesize);
    }

    /**
     * Diese Funktion testet, ob der Character in der Zellmitte ist
     * @return {boolean} True, wenn in Zellmitte
     */
    inZellMitte() {
        let tmp = this.cell.get();
        tmp.x = tmp.x * tilesize + tilesize / 2;
        tmp.y = tmp.y * tilesize + tilesize / 2;
        if (this.location.cmp(tmp))
            return true;
    }

    /**
     * Die Funktion zentriert den Character in der Zellmitte
     */
    zentrieren() {
        if (this.velocity.x != 0)
            this.location.y = this.cell.y * tilesize + tilesize / 2;
        else
            this.location.x = this.cell.x * tilesize + tilesize / 2;
    }

    /**
     * Testet ob eine Zelle eine Wand ist
     * @param {vector2D} pVector Positionsvektor der aktuellen Zelle
     * @return {boolean}    True, wenn die Zelle 1 ist.
     */
    collide(pVector) {
        if (lvl.grid[pVector.y][pVector.x] == 1)
            return true;
        else
            return false;
    }

    /**
     * Gibt den Positionsvektor des Characters zurück
     * @type {vector2D}
     * @return {vector2D} Die Position des Characters
     */
    get loc() {
        return this.location.get();
    }

    /**
     * Gibt den Geschwindigkeitsvektor des Characters zurück
     * @type {vector2D}
     * @return {vector2D} Die Geschwindigkeit des Characters
     */
    get vel() {
        return this.velocity.get();
    }
}