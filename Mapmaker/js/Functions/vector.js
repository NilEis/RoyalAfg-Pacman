/**
 * Die Klasse stellt funktionen zum besseren speichern der Position und Geschwindigkeit eines Objects zur verfügung
 * @file Stellt die Klasse {@link vector2D} zur verfügung
 * @example
 * let location = new vector2D(x, y);
 */
class vector2D {
    /**
     * Der Konstruktor setzt die Attribute x und y.
     * @param {number} x X ist die X Position des Vektors.
     * @param {number} y Y ist die Y Position des Vektors.
     */
    constructor(x, y) {
        /**
         * @type {number}
         */
        this.x = x;
        /**
         * @type {number}
         */
        this.y = y;
    }

    /**
     * @return {vector2D} Erstellt einen zufälligen 2D Vektor
     */
    static random2D() {
        let v = new vector2D(Math.random() * 10, Math.random() * 10);
        v.normalize();
        return v;
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {vector2D} p2 Der Vektor der dem Eingabevektor dazu addiert wird
     * @return {vector2D} Erstellt einen Vektor aus der Summe von p1 und p2.
     */
    static add(p1, p2) {
        return new vector2D(p1.x + p2.x, p1.y + p2.y);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {vector2D} p2 Der Vektor der dem Eingabevektor abgezogen wird
     * @return {vector2D} Erstellt einen Vektor aus der differenz von p1 und p2.
     */
    static sub(p1, p2) {
        return new vector2D(p1.x - p2.x, p1.y - p2.y);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {number} v Die Zahl mit der p1 multipliziert wird
     * @return {vector2D} Erstellt einen Vektor aus dem Produkt von p1 und v.
     */
    static mul(p1, v) {
        return new vector2D(p1.x * v, p1.y * v);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {number} v Die Zahl durch die p1 dividiert wird
     * @return {vector2D} Erstellt einen Vektor aus dem quotienten von p1 und v.
     */
    static div(p1, v) {
        return new vector2D(p1.x / v, p1.y / v);
    }

    /**
     * @return {vector2D} Gibt eine Kopie des Vektors zurück
     */
    get() {
        let tmp = new vector2D(this.x, this.y);
        return tmp;
    }


    /**
     * Addiert einen Vektor auf den aktuellen
     * @param {vector2D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    add(pVector) {
        this.x += pVector.x;
        this.y += pVector.y;
    }

    /**
     * Subtrahiert einen Vektor mit dem aktuellen
     * @param {vector2D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    sub(pVector) {
        this.x -= pVector.x;
        this.y -= pVector.y;
    }

    /**
     * Multipliziert den Vektor mit einem Wert
     * @param {number} pFloat Der Wert mit dem der Vektor multipliziert wird
     */
    mul(pFloat) {
        this.x *= pFloat;
        this.y *= pFloat;
    }

    /**
     * Dividiert den Vektor mit einer bestimmten zahl
     * @param {number} pFloat Der Wert, mit dem dividiert wird
     */
    div(pFloat) {
        this.x /= pFloat;
        this.y /= pFloat;
    }

    /**
     * Die methode vergleicht den Vektor mit einem anderen Vektor
     * @param {vector2D} pVector Der Vektor mit dem verglichen wird.
     * @return {boolean} Gibt true zurück wenn die x- und y-Werte der Vektoren gleich sind, sonst wird false zurückgegeben
     */
    cmp(pVector) {
        if (this.x == pVector.x && this.y == pVector.y)
            return true;
        return false;
    }

    /**
     * Normalisiert den Vektor; setzt die Länge auf 1
     */
    normalize() {
        if (this.mag == 0)
            return;
        this.div(this.mag);
    }

    /**
     * Die Methode verhindert, dass der Vektor länger als ein bestimmter Wert wird
     * @param {number} v Der Maximalwert
     */
    limit(v) {
        if (this.mag > v) {
            this.normalize();
            this.mul(v);
        }
    }

    /**
     * @return {string} Gibt die Werte des Vektors zurück
     */
    toString() {
        return "{ x: " + this.x + ", y: " + this.y + ", mag: " + this.mag + " }";
    }

    /**
     * Gibt die Länge des Vektors zurück
     * @type {number} */
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class vector3D {
    /**
     * Der Konstruktor setzt die Attribute x und y.
     * @param {number} x X ist die X Position des Vektors.
     * @param {number} y Y ist die Y Position des Vektors.
     * @param {number} z Y ist die Z Position des Vektors.
     */
    constructor(x, y, z) {
        /**
         * @type {number}
         */
        this.x = x;
        /**
         * @type {number}
         */
        this.y = y;
        /**
         * @type {number}
         */
        this.z = z;
    }

    /**
     * @return {vector3D} Erstellt einen zufälligen 3D Vektor
     */
    static random3D() {
        let v = new vector3D(Math.random() * 10, Math.random() * 10);
        v.normalize();
        return v;
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {vector3D} p2 Der Vektor der dem Eingabevektor dazu addiert wird
     * @return {vector3D} Erstellt einen Vektor aus der Summe von p1 und p2.
     */
    static add(p1, p2) {
        return new vector3D(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {vector3D} p2 Der Vektor der dem Eingabevektor abgezogen wird
     * @return {vector3D} Erstellt einen Vektor aus der differenz von p1 und p2.
     */
    static sub(p1, p2) {
        return new vector3D(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {number} v Die Zahl mit der p1 multipliziert wird
     * @return {vector3D} Erstellt einen Vektor aus dem Produkt von p1 und v.
     */
    static mul(p1, v) {
        return new vector3D(p1.x * v, p1.y * v, p1.z * v);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {number} v Die Zahl durch die p1 dividiert wird
     * @return {vector3D} Erstellt einen Vektor aus dem quotienten von p1 und v.
     */
    static div(p1, v) {
        return new vector3D(p1.x / v, p1.y / v, p1.z / v);
    }

    /**
     * @return {vector3D} Gibt eine Kopie des Vektors zurück
     */
    get() {
        let tmp = new vector3D(this.x, this.y, this.z);
        return tmp;
    }


    /**
     * Addiert einen Vektor auf den aktuellen
     * @param {vector3D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    add(pVector) {
        this.x += pVector.x;
        this.y += pVector.y;
        this.z += pVector.z;
    }

    /**
     * Subtrahiert einen Vektor mit dem aktuellen
     * @param {vector3D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    sub(pVector) {
        this.x -= pVector.x;
        this.y -= pVector.y;
        this.z -= pVector.z;
    }

    /**
     * Multipliziert den Vektor mit einem Wert
     * @param {number} pFloat Der Wert mit dem der Vektor multipliziert wird
     */
    mul(pFloat) {
        this.x *= pFloat;
        this.y *= pFloat;
        this.z *= pFloat;
    }

    /**
     * Dividiert den Vektor mit einer bestimmten zahl
     * @param {number} pFloat Der Wert, mit dem dividiert wird
     */
    div(pFloat) {
        this.x /= pFloat;
        this.y /= pFloat;
        this.z /= pFloat;
    }

    /**
     * Die methode vergleicht den Vektor mit einem anderen Vektor
     * @param {vector3D} pVector Der Vektor mit dem verglichen wird.
     * @return {boolean} Gibt true zurück wenn die x- und y- und z-Werte der Vektoren gleich sind, sonst wird false zurückgegeben
     */
    cmp(pVector) {
        if (this.x == pVector.x && this.y == pVector.y && this.z == pVector.z)
            return true;
        return false;
    }

    /**
     * Normalisiert den Vektor; setzt die Länge auf 1
     */
    normalize() {
        if (this.mag == 0)
            return;
        this.div(this.mag);
    }

    /**
     * Die Methode verhindert, dass der Vektor länger als ein bestimmter Wert wird
     * @param {number} v Der Maximalwert
     */
    limit(v) {
        if (this.mag > v) {
            this.normalize();
            this.mul(v);
        }
    }

    /**
     * @return {string} Gibt die Werte des Vektors zurück
     */
    toString() {
        return "{ x: " + this.x + ", y: " + this.y + ", z: " + this.z + ", mag: " + this.mag + " }";
    }

    /**
     * Gibt die Länge des Vektors zurück
     * @type {number} */
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
}