/**
 * @file Die Blinky Klasse wird als Unterklasse zu {@link ghost} zur verfügung gestellt
 * @example
 * var vPacman = new pacman(x, y);
 * var blinky = new blinky(x,y,0,1,vPacman);
 */
class blinky extends ghost {
    /**
     * @param {number} xPos Die x-Startposition
     * @param {number} yPos Die y-Startposition
     * @param {number} xVel Die Startgeschwindigkeit in x-Richtung
     * @param {number} yVel Die Startgeschwindigkeit in y-Richtung
     * @param {pacman} pac Eine Referenz zu pacman
     * @extends ghost
     */
    constructor(x, y, xvel, yvel, pac) {
        super("./img/blinky2.png", x, y, xvel, yvel, pac, "red");
        this.name = "Blinky";
    }

    /**
     * Diese Funktion setzt das Ziel auf die aktuelle Position von Pacman
     */
    setZiel() {
        if (lvl.mode == CHASE) {
            let pacPos = toCell(this.pacman.loc);
            let pX = pacPos.x;
            let pY = pacPos.y;
            this.ziel = [pX, pY];
        }else if (lvl.mode == SCATTER) {
            this.ziel = [lvl.blinkyStart.x, lvl.blinkyStart.y];
        }
    }
}