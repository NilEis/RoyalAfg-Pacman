/**
 * @file Stellt die Pacman Klasse zur verfügung
 * @example
 * var vPacman = new pacman(x, y);
 */
class pacman extends obj {

    /**
     * 
     * @param {number} x Die x-Position
     * @param {number} y Die y-Position
     * @augments obj
     */
    constructor(x, y) {
        super(null, x, y, 0, 1);
        /**
         * @member {number} pacman~dir Die Geschwindigkeit, mit der sich der "Mund" von Pacman öffnet und schließt
         */
        this.dir = -10;
        /**
         * @member {number} pacman~pctOpen Mundöffnung in Prozent
         */
        this.pctOpen = 100;
        /**
         * @member {boolean} pacman~moving Gibt an, ob sich der Pacman bewegt und sich der Mund grade bewegen soll
         */
        this.moving = true;
        /**
         * @member {number} pacman~r Der Radius von Pacman
         */
        this.r = tilesize / 2;
        /**
         * @member {vector2D} pacman~nCell Der Positionsvektor der nächsten Zelle
         */
        this.nCell;
        /**
         * @member {string} pacman~name Der Name von Pacman
         * @private
         */
        this.name = "Pacman";
        this.vGeschwind = 10;
    }

    /**
     * Die Methode bewegt den Pacman
     * @override
     */
    move() {
        const geschwindigkeit = Math.ceil(frameTime * this.vGeschwind);
        this.moving = true;
        this.cell = toCell(this.location);
        if (this.inZellMitte() && key === "up" && !(lvl.grid[this.cell.y - geschwindigkeit][this.cell.x] == 1)) {
            this.velocity.x = 0;
            this.velocity.y = -geschwindigkeit;
        } else if (this.inZellMitte() && key === "down" && !(lvl.grid[this.cell.y + geschwindigkeit][this.cell.x] == 1)) {
            this.velocity.x = 0;
            this.velocity.y = geschwindigkeit;
        } else if (this.inZellMitte() && key === "left" && !(lvl.grid[this.cell.y][this.cell.x - geschwindigkeit] == 1)) {
            this.velocity.x = -geschwindigkeit;
            this.velocity.y = 0;
        } else if (this.inZellMitte() && key === "right" && !(lvl.grid[this.cell.y][this.cell.x + geschwindigkeit] == 1)) {
            this.velocity.x = geschwindigkeit;
            this.velocity.y = 0;
        }
        this.nextCell();
        //this.zentrieren();
        if (!this.collide(this.nCell) || !this.inZellMitte()) {
            this.location.add(this.velocity);
        } else {
            this.location.x = this.cell.x * tilesize + tilesize / 2;
            this.location.y = this.cell.y * tilesize + tilesize / 2;
            this.moving = false;
        }

    }

    /**
     * Berechnet die Position der Zelle, die Pacman als nächstes betritt
     */
    nextCell() {
        this.nCell = this.cell.get();
        this.nCell.add(this.velocity);
    }

    /**
     * Zeichnet Pacman auf das Canvas
     * @override
     */
    draw() {
        c.ctx.save();
        this.drawPacman(this.moving && !pause ? this.pctOpen += this.dir : this.pctOpen);
        c.ctx.restore();
    }

    /**
     * Zeichnet den Mund von pacman
     * @param {number} pctOpen Die Öffnung des Munds in Prozent
     */
    drawPacman(pctOpen) {
        const geschwindigkeit = Math.ceil(frameTime * this.vGeschwind);
        c.ctx.translate(this.location.x + constXOffset, this.location.y + constYOffset);
        if (this.velocity.x == 0)
            c.ctx.rotate((this.velocity.y == geschwindigkeit ? 90 : 270) * Math.PI / 180);
        else
            c.ctx.rotate((this.velocity.x == geschwindigkeit ? 0 : 180) * Math.PI / 180);
        let fltOpen = pctOpen / 100;

        c.ctx.beginPath();
        c.ctx.arc(0, 0, this.r, (fltOpen * 0.2) * Math.PI, (2 - fltOpen * 0.2) * Math.PI);

        c.ctx.lineTo(0, 0);
        c.ctx.closePath();

        c.ctx.fillStyle = "#FFFF00";
        c.ctx.fill();
        if (pctOpen % 100 == 0) {
            this.dir = -this.dir;
        }
    }
}