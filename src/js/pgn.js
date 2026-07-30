// ======================================
// pgn.js
// ======================================

import { Chess } from "chess.js";
import { getGame } from "./database.js";

export const game = new Chess();

let currentGame = null;
let currentMove = 0;

// ==============================
// Charger une variante
// ==============================

export function loadGame(index) {

    currentGame = getGame(index);

    game.reset();

    currentMove = 0;

}

// ==============================
// Coup suivant
// ==============================

export function nextMove() {

    if (!currentGame) return false;

    if (currentMove >= currentGame.moves.length) return false;

    const move = game.move(currentGame.moves[currentMove]);

    if (!move) {

        console.error("Coup invalide :", currentGame.moves[currentMove]);

        return false;

    }

    currentMove++;

    return true;

}

// ==============================
// Coup précédent
// ==============================

export function previousMove() {

    if (currentMove === 0) return false;

    game.undo();

    currentMove--;

    return true;

}

// ==============================
// Début
// ==============================

export function firstMove() {

    game.reset();

    currentMove = 0;

}

// ==============================
// Fin
// ==============================

export function lastMove() {

    if (!currentGame) return;

    while (currentMove < currentGame.moves.length) {

        if (!nextMove()) break;

    }

}

// ==============================
// Aller à un coup
// ==============================

export function goToMove(index) {

    firstMove();

    while (currentMove < index) {

        if (!nextMove()) break;

    }

}

// ==============================
// Getters
// ==============================

export function getCurrentMove() {

    return currentMove;

}

export function getCurrentGame() {

    return currentGame;

}

export function getMoves() {

    return currentGame ? currentGame.moves : [];

}