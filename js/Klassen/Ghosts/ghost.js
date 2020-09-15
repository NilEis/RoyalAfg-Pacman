/**
 * @file Stellt die Ghost Oberklasse zur verfügung
 **/

class ghost extends obj {
    /**
     * Der Constructor setzt den Positions- und Geschwindigkeitsvektor und {@link pacman |Pacman}.
     * @param {string} img Der Pfad zur Textur des Geistes
     * @param {number} x Die x-Startposition
     * @param {number} y Die y-Startposition
     * @param {number} xvel Die x-Startgeschwindigkeit
     * @param {number} yvel Die y-Startgeschwindigkeit
     * @param {pacman} pac Eine Referenz zu Pacman
     * @param {string} color Die Farbe des Geistes
     * @augments obj
     */
    constructor(img, x, y, xvel, yvel, pac, color) {
        super(img, x, y, xvel, yvel);
        this.ziel = [0, 0];
        //Easystar ist eine API mit der ich die Wege für die geister berechnen lasse, ich habe diese allerdings Modifiziert um besser die einzelnen geister anzusprechen
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(lvl.grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableSync();
        this.pacman = pac;
        this.path = null;
        this.color = color;
        this.start = this.location.get();
        this.v = 0.5;
    }

    draw() {
        super.draw();
        this.drawPath();
    }

    drawPath() {
        if (debug && this.path != null) {
            let path = this.path;
            c.ctx.beginPath(path[0].x * tilesize + tilesize / 2 + constXOffset, path[0].y * tilesize + tilesize / 2 + constYOffset);
            for (let i = 1; i < this.path.length; i++) {
                c.ctx.lineTo(path[i].x * tilesize + tilesize / 2 + constXOffset, path[i].y * tilesize + tilesize / 2 + constYOffset);
            }
            c.ctx.strokeStyle = this.color;
            c.ctx.lineWidth = 5;
            c.ctx.stroke();
            c.ctx.lineWidth = 2;
            c.drawCircle(path[path.length - 1].x * tilesize + tilesize / 2 + constXOffset, path[path.length - 1].y * tilesize + tilesize / 2 + constYOffset, tilesize / 1.5, this.color);
        }
    }

    /**
     * Bewegt den Geist, indem es mit der aktuellen Position von Pacman das Ziel setzt und in die Richtung geht.
     * Desweiteren wird die Zelle hinter dem Geist für die Dauer der berechnung des Pfades zu einer Wand geändert, um zu verhindern, dass sich der Geist umdreht
     * @override
     */
    move() {
        this.cell = toCell(this.location); //Berechnet die Position des Geistes im Grid
        if (this.cell.x > spalten - 1 || this.cell.x < 0 || this.cell.y > zeilen - 1 || this.cell.y < 0) {
            this.location = this.start.get();
            this.velocity = new vector2D(0, 0);
        }
        let xOffset = this.cell.x - this.velocity.x * 2;
        let yOffset = this.cell.y - this.velocity.y * 2;
        let cFlag = true;
        try {
            if (lvl.grid[yOffset][xOffset] == 1 || (xOffset == this.cell.x && yOffset == this.cell.y))
                cFlag = false;
            else
                lvl.grid[yOffset][xOffset] = 2;
        } catch {
            cFlag = false;
        }
        if (this.inZellMitte()) {


            //if (this.path !== null)
            //this.easystar.cancelPath(this.path);
            this.setZiel();

            if (this.ziel[0] == this.cell.x && this.ziel[1] == this.cell.y) {
                this.ziel[0] += this.velocity.x * 2;
                this.ziel[1] += this.velocity.y * 2;
            }

            if (lvl.grid[this.ziel[1]][this.ziel[0]] == 1) {
                this.ziel[0] += 1;
            }

            //Erste Möglichkeit zum Berechnen der neuen Richtung.
            if (origPath) {
                const richtungen = [];
                //Links
                richtungen.push(new vector2D(-1,0));
                //Rechts
                richtungen.push(new vector2D(1,0));
                //Oben
                richtungen.push(new vector2D(0,-1));
                //Unten
                richtungen.push(new vector2D(0,1));
            } else {
                //Zweite Möglichkeit
                this.path = this.easystar.findPath(this.cell.x, this.cell.y, this.ziel[0], this.ziel[1], this.parsePath, this);
                this.easystar.calculate();
            }
        }
        this.location.add(this.velocity);
        if (cFlag)
            lvl.grid[yOffset][xOffset] = 0;
    }

    /**
     * Diese Funktion, ist die callbackfunction für die Pfadfindung
     * @param {object[]} path Der Pfad, den der Pfadfinder gefunden hat
     * @param {ghost} ghost Eine Referenz auf den Geist, der den Pfad angefordert hat.
     */
    parsePath(path, ghost) {
        if (path === null || !path[0]) {
            return;
        } else {
            /*if (path[0] === undefined)
                stop();*/
            let pTmp = [path[1].x - path[0].x, path[1].y - path[0].y];
            pTmp = new vector2D(pTmp[0], pTmp[1]);
            pTmp.mul(ghost.v);
            ghost.velocity = pTmp.get();
            ghost.path = path;
        }

    }
}