import "../css/app.css";

const nav = `
<header class="navbar">

    <div class="logo">
        ♞ Larsen Ultimate Encyclopedia
    </div>

    <nav>

        <a href="./index.html">Accueil</a>

        <a href="./encyclopedia.html">📚 Encyclopédie</a>

        <a href="./explorer.html">♟ Explorer</a>

        <a href="./tree.html">🌳 Arbre</a>

    </nav>

</header>
`;

document.body.insertAdjacentHTML("afterbegin", nav);