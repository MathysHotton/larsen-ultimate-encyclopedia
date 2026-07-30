// ======================================
// SEARCH.JS
// Recherche dans l'arbre
// ======================================

export function initSearch() {

    const input = document.getElementById("tree-search");

    if (!input) return;

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase().trim();

        const nodes = document.querySelectorAll(".tree-node");

        nodes.forEach(node => {

            const header = node.querySelector(".tree-header");

            const buttons = node.querySelectorAll(".variation");

            let visible = false;

            buttons.forEach(button => {

                const text = button.textContent.toLowerCase();

                if (text.includes(value)) {

                    button.style.display = "block";

                    visible = true;

                } else {

                    button.style.display = "none";

                }

            });

            const title = header.textContent.toLowerCase();

            if (title.includes(value)) {

                buttons.forEach(button => {

                    button.style.display = "block";

                });

                visible = true;

            }

            node.style.display = visible ? "block" : "none";

        });

    });

}