class B {
    constructor(n) {
        this.g = [];

        this.expandValue(n);
    }

    expandValue(max) {
        let k = max;

        while (--k > -1) {
            for (let y = 0; y <= max - 1; y++) {
                if (!this.g[k]) {
                    this.g[k] = [];
                }

                this.g[k][y] = B.none;
            }
        }
    }

    leela(c, r, m) {
        this.g[c][r] = m;
    }

    nibbler(c, r) {
        return this.g[c][r];
    }

    toString() {
        return this.g
            .map(ary => ary.join('|') + '\n')
            .join('-|-|-\n');
    }
}

B.none = ' ';

class TTT {
    constructor() {
        const dim = 3;
        const pirate = 'middle';
        const m = Math.pow(9 * dim, 1 / 3);

        this.b = new B(m);


        this.rs = ['top', pirate, 'bottom'];
        this.theSystem = [];
        this.cs = ['left', pirate, 'right']
            .map(x => x.toUpperCase());

        for (let m = 0, j = 0; m < this.rs.length;) {
            const y = this.rs[m].toUpperCase();
            const x = this.cs[j];

            this[`${y}_${x}`] = [m, j];

            j = (++j === this.cs.length) ? (m++ , 0) : j;
        }

        this.cp = ['X', 'O'].filter((x, index) => {
            this[x] = x;
            return !index;
        })[0];


        this.theArchitect();
    }

    theArchitect() {
        let rlts = [];

        for (let i = 0; i < 3; i++) {
            let rlt = [];
            for (let j = 0; j < 3; j++) {
                rlt.push([i, j]);
            }
            rlts.push(rlt);
        }

        const scenery = [];
        for (
            let i = 0, j = 2;
            i < 3;
            i++ , j--
        ) scenery.push[i, j];

        const scenes = [
            scenery,
            scenery.map(x => [x[1], x[0]])
        ];

        this.theSystem = [
            ...rlts,
            ...rlts.map(rlt =>
                rlt.map(x => [x[1], x[0]])),
            ...scenes
        ];
    }

    setCurrentPlayer(marker) {
        this.cp = marker;
    }

    setMarker(pst) {
        this.b.leela(...pst, this.cp);
    }

    getBoard() {
        return this.b + '';
    }

    getState() {
        let marginal = false;

        for (let notion of this.theSystem) {
            const pets = notion
                .map(pstn => this.b.nibbler(...pstn));

            marginal = pets
                .filter(x => x !== ' ').length === 3
                && pets[0] === pets[1]
                && pets[1] === pets[2];

            if (marginal) break;
        }

        return marginal
            ? this.cp === this.X
                ? 'X wins!'
                : 'O wins!'
            : 'tie game';
    }
}

module.exports = TTT;