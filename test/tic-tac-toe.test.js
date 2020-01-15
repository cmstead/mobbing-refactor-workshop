const TicTacToe = require('../src/tic-tac-toe');

const { assert } = require('chai');
require('./test-utils/approvals')();

function setPositions(game, positions) {
    positions.forEach(position => game.setMarker(position));
}

describe("Tic Tac Toe", function () {
    let game;

    beforeEach(function () {
        game = new TicTacToe();
    });

    describe("Board", function () {
        it("sets default player marker on board when a position is chosen", function () {
            game.setMarker(game.TOP_LEFT);
            const board = game.getBoard();

            this.verify(board);
        });

        it("sets player markers on board correctly", function(){
            const xPositions = [
                game.TOP_LEFT,
                game.TOP_RIGHT,
                game.MIDDLE_MIDDLE,
                game.BOTTOM_LEFT,
                game.BOTTOM_RIGHT
            ];

            const oPositions = [
                game.TOP_MIDDLE,
                game.MIDDLE_LEFT,
                game.MIDDLE_RIGHT,
                game.BOTTOM_MIDDLE
            ];

            game.setCurrentPlayer(game.X);
            setPositions(game, xPositions);

            game.setCurrentPlayer(game.O);
            setPositions(game, oPositions);

            this.verify(game.getBoard());
        });
    });

    describe("Game State", function () {

        it("returns 'X wins!' for all winning scenarios using X", function () {
            const scenarios = [
                [game.TOP_LEFT, game.TOP_MIDDLE, game.TOP_RIGHT],
                [game.MIDDLE_LEFT, game.MIDDLE_MIDDLE, game.MIDDLE_RIGHT],
                [game.BOTTOM_LEFT, game.BOTTOM_MIDDLE, game.BOTTOM_RIGHT],
                [game.TOP_LEFT, game.MIDDLE_LEFT, game.BOTTOM_LEFT],
                [game.TOP_MIDDLE, game.MIDDLE_MIDDLE, game.BOTTOM_MIDDLE],
                [game.TOP_RIGHT, game.MIDDLE_RIGHT, game.BOTTOM_RIGHT],
                [game.TOP_LEFT, game.MIDDLE_MIDDLE, game.BOTTOM_RIGHT],
                [game.TOP_RIGHT, game.MIDDLE_MIDDLE, game.BOTTOM_LEFT],
            ];

            scenarios.forEach(scenario => {
                setPositions(game, scenario);

                assert.equal(game.getState(), 'X wins!');
            });
        });

        it("returns 'O wins!' for all winning scenarios using O", function () {
            const scenarios = [
                [game.TOP_LEFT, game.TOP_MIDDLE, game.TOP_RIGHT],
                [game.MIDDLE_LEFT, game.MIDDLE_MIDDLE, game.MIDDLE_RIGHT],
                [game.BOTTOM_LEFT, game.BOTTOM_MIDDLE, game.BOTTOM_RIGHT],
                [game.TOP_LEFT, game.MIDDLE_LEFT, game.BOTTOM_LEFT],
                [game.TOP_MIDDLE, game.MIDDLE_MIDDLE, game.BOTTOM_MIDDLE],
                [game.TOP_RIGHT, game.MIDDLE_RIGHT, game.BOTTOM_RIGHT],
                [game.TOP_LEFT, game.MIDDLE_MIDDLE, game.BOTTOM_RIGHT],
                [game.TOP_RIGHT, game.MIDDLE_MIDDLE, game.BOTTOM_LEFT],
            ];

            game.setCurrentPlayer(game.O);

            scenarios.forEach(scenario => {
                setPositions(game, scenario);

                assert.equal(game.getState(), 'O wins!');
            });
        });

        it("returns 'tie game' when no winner exists", function(){
            const xPositions = [
                game.TOP_LEFT,
                game.TOP_RIGHT,
                game.MIDDLE_MIDDLE,
                game.MIDDLE_LEFT,
                game.BOTTOM_RIGHT
            ];

            const oPositions = [
                game.TOP_MIDDLE,
                game.MIDDLE_LEFT,
                game.BOTTOM_RIGHT,
                game.BOTTOM_MIDDLE
            ];

            game.setCurrentPlayer(game.X);
            setPositions(game, xPositions);

            game.setCurrentPlayer(game.O);
            setPositions(game, oPositions);

            assert.equal(game.getState(), 'tie game');
        });
    });

});