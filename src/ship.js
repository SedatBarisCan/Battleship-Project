export default function Ship (length, name) {
    return {
        length: length,
        hitCount: 0,
        sunk: false,
        name: name,

        hit: function () {
            this.hitCount++;
        },
        isSunk: function () {
            if ( this.hitCount === this.length ) {
                this.sunk = true;
            } else {
                this.sunk = false;
            }
        }
    }
}