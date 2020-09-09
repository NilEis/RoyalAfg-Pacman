/**
 * @file Die Pinky Klasse wird als Unterklasse zu {@link ghost} zur verfügung gestellt
 * @example
 * var vPacman = new pacman(x, y);
 * var blinky = new blinky(x,y,0,1,vPacman);
 */
class pinky extends ghost {
    /**
     * @param {number} xPos Die x-Startposition
     * @param {number} yPos Die y-Startposition
     * @param {number} xVel Die Startgeschwindigkeit in x-Richtung
     * @param {number} yVel Die Startgeschwindigkeit in y-Richtung
     * @param {pacman} pac Eine Referenz zu pacman
     * @extends ghost
     */
    constructor(x, y, xvel, yvel, pac) {
        super("./img/pinky.png", x, y, xvel, yvel, pac, "pink");
        this.name = "Pinky";
    }

    /**
     * Diese Funktion setzt das Ziel zwei Zellen vor Pacman
     */
    setZiel() {
        if (lvl.mode == CHASE) {
            let pacPos = toCell(this.pacman.loc);
            let pacVel = this.pacman.vel.get();
            let mul = 3;
            pacVel.mul(mul);
            pacPos.add(pacVel);
            while (lvl.grid[pacPos.y][pacPos.x] === null || lvl.grid[pacPos.y][pacPos.x] === undefined || lvl.grid[pacPos.y][pacPos.x] == 1) {
                pacPos.sub(pacVel);
                pacVel.div(mul);
                mul--;
                pacVel.mul(mul);
                pacPos.add(pacVel);
            }
            let pX = pacPos.x;
            let pY = pacPos.y;
            this.ziel = [pX, pY];
        }else if (lvl.mode == SCATTER) {
            this.ziel = [lvl.speedyStart.x, lvl.speedyStart.y];
        }
    }
}