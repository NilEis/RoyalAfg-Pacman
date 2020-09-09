/**
 * @file Die Clyde Klasse wird als Unterklasse zu {@link ghost} zur verfügung gestellt
 * @example
 * var vPacman = new pacman(x, y);
 * var clyde = new clyde(x,y,0,1,vPacman);
 */
class clyde extends ghost {
    /**
     * @param {number} xPos Die x-Startposition
     * @param {number} yPos Die y-Startposition
     * @param {number} xVel Die Startgeschwindigkeit in x-Richtung
     * @param {number} yVel Die Startgeschwindigkeit in y-Richtung
     * @param {pacman} pac Eine Referenz zu pacman
     * @extends ghost
     */
    constructor(x, y, xvel, yvel, pac) {
        super("./img/clyde.png", x, y, xvel, yvel, pac, "orange");
        this.name = "Clyde";
    }

    /**
     * Diese Funktion setzt das Ziel auf die aktuelle Position von Pacman, außer die Entfernung ({@link manhattenDistance}) ist kleiner als 8, worauf er in seine Ecke vom {@link level#grid|grid} geht.
     */
    setZiel() {
        if (lvl.mode == CHASE) {
            let pacPos = toCell(this.pacman.loc);
            let pX = pacPos.x;
            let pY = pacPos.y;
            if (manhattenDistance(this.cell.x, this.cell.y, pX, pY) >= 8)
                this.ziel = [pX, pY];
            else
                this.ziel = [lvl.clydeStart.x, lvl.clydeStart.y];
        } else if (lvl.mode == SCATTER) {
            this.ziel = [lvl.clydeStart.x, lvl.clydeStart.y];
        }
    }
}