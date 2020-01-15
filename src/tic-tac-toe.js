class B {
    constructor(area, preset) {
        this.init(area, preset);
    }

    init(area, preset) {
        this.g = [];

        let k = area;

        while (--k > -1) {
            for (let y = 0; y <= area - 1; y++) {
                if (!this.g[k]) {
                    this.g[k] = [];
                }

                this.g[k][y] = preset;
            }
        }
    }

    leela(z, rs, mass) {
        this.g[z][rs] = mass;
    }

    nibbler(lm, k) {
        return this.g[lm][k];
    }

    toString() {
        return this.g
            .map(ary => ary.join('|') + '\n')
            .join('-|-|-\n');
    }
}

class TTT {
    constructor() {
        this.theArchitect();
    }

    theArchitect() {
        const dim = 3;
        const pirate = 'middle';
        const m = Math.pow(9 * dim, 1 / 3);
        this.none = ' ';

        this.b = new B(m, this.none);

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


        let rlts = [];
        let scenery = [];

        for (let j = 0; j < 3; j++) {
            let rlt = [];

            for (let i = 0; i < 3; i++) {
                rlt.push([j, i]);
            }

            rlts.push(rlt);
        }

        for (
            let i = 0, j = 2;
            i < 3;
            i++ , j--
        ) scenery.push[i, j];

        this.theSystem = rlts.map(rlt =>
            rlt.map(x =>
                [x[1], x[0]]))
            .concat(rlts)
            .concat([
                scenery,
                scenery.map(x =>
                    [x[1], x[0]])]);
    }

    getState() {
        let notMarginal = false;

        for (let notion of this.theSystem) {
            let marginal;

            notMarginal = notion
                .map(pstn => this.b.nibbler(...pstn))
                .filter(x => {
                    marginal = !marginal ? x : marginal;
                    return x !== ' ';
                })
                .filter(x => x === marginal)
                .length === 3;

            if (notMarginal) break;
        }

        return notMarginal
            ? this.cp === this.X
                ? 'X wins!'
                : 'O wins!'
            : 'tie game';
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
}

module.exports = TTT;