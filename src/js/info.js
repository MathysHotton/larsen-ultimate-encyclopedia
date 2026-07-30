// ======================================
// INFO.JS
// ======================================

import { getCurrentGame } from "./pgn.js";

export function refreshInfo() {

    const container = document.getElementById("info");

    if (!container) return;

    const game = getCurrentGame();

    if (!game) {

        container.innerHTML = "<p>Aucune variante sélectionnée.</p>";

        return;

    }

    const h = game.headers;

    container.innerHTML = `

        <div class="info-card">

            <h3>${game.event || "Sans nom"}</h3>

            <hr>

            <p><strong>Variante :</strong> ${game.variation || "-"}</p>

            <p><strong>ECO :</strong> ${game.eco || "-"}</p>

            <p><strong>Blanc :</strong> ${h.White || "-"}</p>

            <p><strong>Noir :</strong> ${h.Black || "-"}</p>

            <p><strong>Résultat :</strong> ${h.Result || "-"}</p>

            <p><strong>Difficulté :</strong> ${h.Difficulty || "-"}</p>

            <p><strong>Plan :</strong> ${h.Plan || "-"}</p>

            <p><strong>Piège :</strong> ${h.Trap || "-"}</p>

            <p><strong>Commentaires :</strong> ${h.Comment || "-"}</p>

            <p><strong>Source :</strong> ${h.Source || "-"}</p>

        </div>

    `;

}