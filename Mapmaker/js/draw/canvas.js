/**
 * canvasClass ist eine Klasse, die das zugreifen auf das Canvas Objekt erleichtert.
 * @file Stellt Methoden zum Zugriff auf das HTML5 Canvas zur verfügung
 * @example
 * let c = new canvasClass("canvas", w, h, "green");
 */
class canvasClass {
    /**
     * Der Construktor der Funktion
     * @param {string} canvas Der Name für für die Id des Canvas, welches der Constructor erzeugt.
     * @param {number} width Die Breite des Canvas.
     * @param {number} height Die Höhe des Canvas.
     * @param {string} [color= ""] Die Hintergrundfarbe des Canvas.
     */
    constructor(canvas, width, height, color = "") {
        let node = document.createElement("canvas");
        node.setAttribute("id", canvas);
        document.getElementById("canvasDiv").appendChild(node);
        /**
         * @member {canvas} canvasClass~canvas
         */
        this.canvas = document.getElementById(canvas);
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("onmousemove", "updateMouse(event)");
        this.canvas.setAttribute("oncontextmenu", "return false");
        /**
         * @member {getContext} canvasClass~ctx
         */
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.backgroundColor = color;
    }

    /**
     * Gibt die hintergrundfarbe zurück
     * @type {string}
     * @returns {string}    Die Farbe des Hintergrunds
     */
    get background() {
        return this.canvas.style.backgroundColor;
    }

    /**
     * Setzt die Hintergrundfarbe
     * @param {string} c Die Farbe die als neuer Hintergrund gesetzt werden soll
     */
    set background(c) {
        this.canvas.style.backgroundColor = c;
    }

    /**
     * Gibt die Breite des Canvas zurück
     * @type {number}
     * @returns {number} Die Breite des Canvas */
    get width() {
        return this.canvas.width;
    }
    /**
     * Setzt eine neue Breite
     * @param {number} w Die neue breite des Canvas
     */
    set width(w) {
        this.canvas.width = w;
    }

    /**
     * Gibt die höhe des canvas zurück
     * @type {number}
     * @returns {number} Die Höhe des Canvas */
    get height() {
        return this.canvas.height;
    }
    /**
     * Setzt eine neue Höhe für das Canvas
     * @param h {number} Die neue höhe des Canvas
     */
    set height(h) {
        this.canvas.height = h;
    }

    drawSprite(img, ix, iy, iw, ih, x, y, w, h) {
        this.ctx.drawImage(img, ix, iy, ih, iw, x, y, w, h);
    }

    /**
     * Zeichnet ein Bild aufs canvas
     * @param {Image} image Das zu zeichnende Bild
     * @param {number} x Die x-Position des Bilds
     * @param {number} y Die y-Position des Bilds
     * @param {number} w Die Breite des Bilds
     * @param {number} h Die Höhe des Bilds
     */
    drawImage(image, x, y, w, h) {
        this.ctx.drawImage(image, x, y, w, h);
    }

    /**
     * Zeichnet die Zellen eines 2D Arrays auf das canvas
     * @param {number[][]} arr Das 2D Array
     * @param {string[]} colorArray Die Zahlen in den Zellen des 2D Arrays geben den Index für die Zellen mit der entsprechenden Farbe an
     * @param {number} w Die Breite jeder Zelle
     * @param {number} h Die Höhe jeder Zelle
     */
    fillArray(arr, colorArray, w = Math.floor(canvas.width / arr[0].length), h = Math.floor(canvas.height / arr.length), xOffset = 0, yOffset = 0) {
        let abstand = 0;
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                this.fillRect(x * w + abstand + xOffset, y * h + abstand + yOffset, w - abstand, h - abstand, lvl.coins[xyToI(x, y, spalten)]?"yellow":colorArray[arr[y][x]], abstand == 0 ? false : true);
            }
        }
    }

    /**
     * Zeichnet die die Bilder in den Zellen eines 2D Arrays auf das canvas
     * @param {Image[][]} arr Das 2D Array, dass die Bilder enthält
     * @param {number} w Die Breite jeder Zelle
     * @param {number} h Die Höhe jeder Zelle
     */
    imageArray(arr, w = Math.floor(canvas.width / arr[0].length), h = Math.floor(canvas.height / arr.length), xOffset = 0, yOffset = 0) {
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                this.drawImage(arr[y][x], x * w + xOffset, y * h + yOffset, w, h);
            }
        }
    }

    /**
     * Zeichnet ein den Umriss eines Rechtecks auf das Canvas
     * @param {number} x Die x-Position
     * @param {number} y Die y-Position
     * @param {number} w Die Breite
     * @param {number} h Die Höhe
     * @param {string} [color = "black"] Die Farbe der Umrandung
     */
    drawRect(x, y, w, h, color = "black") {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, h);
    }

    drawCell(x, y, color = "black") {
        this.drawRect(x * tilesize, y * tilesize, tilesize, tilesize, color);
    }

    fillCell(x, y, color = "black") {
        this.fillRect(x * tilesize, y * tilesize, tilesize, tilesize, color);
    }

    /**
     * Zeichnet ein Rechteck auf das Canvas
     * @param {number} x Die x-Position
     * @param {number} y Die y-Position
     * @param {number} w Die Breite
     * @param {number} h Die Höhe
     * @param {string} color Die Farbe der Umrandung
     * @param {boolean} [border = false] Wenn wahr, wird eine Umrandung gezeichnet
     * @param {string} [bColor = "black"] Gibt die Farbe für die umrandung an
     */
    fillRect(x, y, w, h, color, border = false, bColor = "black") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.strokeStyle = bColor;
        if (border)
            this.ctx.strokeRect(x, y, w, h);
    }

    /**
     * Löscht alles was auf das Canvas gezeichnet wurde
     */
    cls() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
    }


    /**
     * Zeichnet eine Linie durch eine Reihe von Punkten
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als zwei Punkte ist
     */
    drawPath(path, color = "black") {
        if (path.length <= 1)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        for (let i = 1; i < path.length; i++) {
            this.ctx.lineTo(path[i][0], path[i][1]);
        }
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /**
     * Zeichnet einen Pfad durch eine Reihe von Punkten und schließt diesen am Ende
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als drei Punkte ist
     */
    drawShape(path, color = "black") {
        if (path.length <= 2)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        while (path.length != 0) {
            tmp = path.pop();
            this.ctx.lineTo(tmp[0], tmp[1]);
        }
        this.ctx.strokeStyle = color;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * Zeichnet einen Pfad durch eine Reihe von Punkten und schließt und füllt diesen am Ende
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @param {boolean} [outline = "false"] Wenn wahr, wird der Umriss mit gezeichnet
     * @param {string} [strokeColor = "black"] Gibt die farbe für die Umrandung an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als drei Punkte ist
     */
    fillShape(path, color = "black", outline = false, strokeColor = "black") {
        if (path.length <= 2)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        while (path.length != 0) {
            tmp = path.pop();
            this.ctx.lineTo(tmp[0], tmp[1]);
        }
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.closePath();
        if (outline)
            this.ctx.stroke();
        this.ctx.fill();
    }

    /**
     * Zeichnet den Umriss eines Kreises
     * @param {number} x Gibt die Position des Kreises an
     * @param {number} y Gibt die y-Position des Kreises an
     * @param {number} r Gibt den radius des Kreises an
     * @param {string} color Gibt die Farbe des Kreises an
     */
    drawCircle(x, y, r, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    /**
     * Zeichnet eine Kreises
     * @param {number} x Gibt die Position des Kreises an
     * @param {number} y Gibt die y-Position des Kreises an
     * @param {number} r Gibt den radius des Kreises an
     * @param {string} color Gibt die Farbe des Kreises an
     * @param {boolean} [outline=false] Wenn wahr, wird der umriss gezeichnet
     * @param {string} [outColor="blac"] Gibt die Farbe der Umrandung an
     */
    fillCircle(x, y, r, color, outline = false, outColor = "black") {
        this.ctx.strokeStyle = outColor;
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        if (outline)
            this.ctx.stroke();
        this.ctx.closePath();
    }


    static convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }
}