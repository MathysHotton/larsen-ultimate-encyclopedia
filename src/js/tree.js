// ======================================
// TREE.JS
// Génération automatique de l'arbre
// ======================================

import { initSearch } from "./search.js";
import {

    initDatabase,
    getGames

} from "./database.js";

async function initTree() {

    const container = document.getElementById("tree");

    if (!container) return;

    await initDatabase();

    const games = getGames();

    container.innerHTML = "";

    // Regroupement par Event
    const groups = {};

    games.forEach((game, index) => {

        const event = game.event || "Autres";

        if (!groups[event]) {

            groups[event] = [];

        }

        groups[event].push({

            index,

            game

        });

    });

    // Construction de l'arbre
    Object.keys(groups).sort().forEach(event => {

        const node = document.createElement("div");
        node.className = "tree-node";

        const header = document.createElement("div");
        header.className = "tree-header";
        header.textContent = "📁 " + event;

        const children = document.createElement("div");
        children.className = "tree-children";

        children.style.display = "none";

        header.onclick = () => {

            children.style.display =

                children.style.display === "none"

                ? "block"

                : "none";

        };

        groups[event].forEach(item => {

            const button = document.createElement("button");

            button.className = "variation";

            button.textContent =

                item.game.variation ||

                "Variante principale";

            button.onclick = () => {

                localStorage.setItem(

                    "selectedGame",

                    item.index

                );

                window.location.href =

                    "/src/pages/explorer.html";

            };

            children.appendChild(button);

        });

        node.appendChild(header);

        node.appendChild(children);

        container.appendChild(node);

    });

}

initTree().then(() => {

    initSearch();

});