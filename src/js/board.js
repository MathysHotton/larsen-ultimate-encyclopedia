// ======================================
// board.js
// ======================================

import { Chessground } from "chessground";

import { initDatabase } from "./database.js";

import {
    game,
    loadGame,
    nextMove,
    previousMove,
    firstMove,
    lastMove
} from "./pgn.js";

import { refreshMoves } from "./moves.js";
import { refreshInfo } from "./info.js";

let board = null;

// ======================================
// Initialisation
// ======================================

async function init() {

    const element = document.getElementById("board");

    if (!element) {

        console.error("#board introuvable");

        return;

    }

    await initDatabase();

    const index = Number(
        localStorage.getItem("selectedGame") || 0
    );

    loadGame(index);

    board = Chessground(element, {

        fen: game.fen(),

        orientation: "white",

        coordinates: true,

        animation: {

            enabled: true,
            duration: 250

        },

        movable: {

            free: false,
            color: undefined

        },

        draggable: {

            enabled: false

        },

        selectable: {

            enabled: false

        },

        highlight: {

            lastMove: true,
            check: true

        }

    });

    console.log(board);

    installButtons();

    refresh();

}

// ======================================
// Rafraîchir
// ======================================

export function refresh() {

    if (!board) return;

    console.log(game.fen());

    board.set({

        fen: game.fen()

    });

    refreshMoves(refresh);

    refreshInfo();

}

// ======================================
// Boutons
// ======================================

function installButtons() {

    document.getElementById("next").onclick = () => {

        nextMove();

        refresh();

    };

    document.getElementById("previous").onclick = () => {

        previousMove();

        refresh();

    };

    document.getElementById("first").onclick = () => {

        firstMove();

        refresh();

    };

    document.getElementById("last").onclick = () => {

        lastMove();

        refresh();

    };

}

// ======================================

init();