/**
 * @file Die Inky Klasse wird als Unterklasse zu {@link ghost} zur verfügung gestellt
 * @example
 * var vPacman = new pacman(x, y);
 * var inky = new inky(x,y,0,1,vPacman);
 */
class inky extends ghost {
    /**
     * @param {number} xPos Die x-Startposition
     * @param {number} yPos Die y-Startposition
     * @param {number} xVel Die Startgeschwindigkeit in x-Richtung
     * @param {number} yVel Die Startgeschwindigkeit in y-Richtung
     * @param {pacman} pac Eine Referenz zu pacman
     * @extends ghost
     */
    constructor(x, y, xvel, yvel, pac, blinky) {
        super("./img/inky.png", x, y, xvel, yvel, pac, "blue");
        this.name = "inky";
        this.blinky = blinky;
    }

    /**
     * Diese Funktion setzt das Ziel auf drei Felder hinter die aktuelle Position von Pacman
     */
    setZiel() {
        if (lvl.mode == CHASE) {
            let pacPos = toCell(this.pacman.loc);
            let pacVel = this.pacman.vel.get();
            let mul = -3;
            pacVel.mul(mul);
            pacPos.add(pacVel);
            while (lvl.grid[pacPos.y][pacPos.x] === null || lvl.grid[pacPos.y][pacPos.x] === undefined || lvl.grid[pacPos.y][pacPos.x] == 1) {
                pacPos.sub(pacVel);
                pacVel.div(mul);
                mul++;
                pacVel.mul(mul);
                pacPos.add(pacVel);
            }
            let pX = pacPos.x;
            let pY = pacPos.y;
            this.ziel = [pX, pY];
        } else if (lvl.mode == SCATTER) {
            this.ziel = [lvl.inkyStart.x, lvl.inkyStart.y];
        }
    }
    /*
    setZiel() {
        if (lvl.mode == CHASE) {
            let pacPos = toCell(this.pacman.loc);
            let pacVel = this.pacman.vel.get();
            pacVel.mul(2);
            pacPos.add(pacVel);
            let ziel = vector2D.sub(this.blinky.cell, pacPos);
            ziel.mul(2);
            ziel = vector2D.add(this.blinky.cell, ziel);
            if (ziel.x > spalten || ziel.x < 0 || ziel.y > zeilen || ziel.y < 0) {
                let suchbereich = 15;
                let wege = [];
                for (let _x = 0 - suchbereich; _x < suchbereich; _x++) {
                    for (let _y = 0 - suchbereich; _y < suchbereich; _y++) {
                        let nx = ziel.x + _x;
                        let ny = ziel.y + _y;
                        if (lvl.grid[ny][nx] && lvl.grid[ny][nx] != 1) {
                            wege.push({
                                x: nx,
                                y: ny,
                                dist: euclideanDistance(nx, ny, ziel.x, ziel.y)
                            });
                        }
                    }
                }
                wege.sort(function (a, b) {
                    return b.dist - a.dist;
                });
                ziel = new vector2D(wege[0].x, wege[0].y);
            }
            this.ziel = [ziel.x, ziel.y];
        } else if (lvl.mode == SCATTER) {
            this.ziel = [lvl.inkyStart.x, lvl.inkyStart.y];
        }
    }*/
}