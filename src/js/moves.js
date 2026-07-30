// ======================================
// MOVES.JS
// ======================================

import {

    getMoves,
    getCurrentMove,
    goToMove

} from "./pgn.js";

// ======================================
// Affichage des coups
// ======================================

export function refreshMoves(refreshBoard) {

    const container = document.getElementById("moves");

    if (!container) return;

    container.innerHTML = "";

    const moves = getMoves();

    const current = getCurrentMove();

    moves.forEach((move, index) => {

        const button = document.createElement("button");

        button.className = "move";

        button.textContent = move;

        if (index === current - 1) {

            button.classList.add("active");

        }

        button.addEventListener("click", () => {

            goToMove(index + 1);

            refreshBoard();

        });

        container.appendChild(button);

    });

}