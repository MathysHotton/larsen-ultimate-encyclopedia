// ===============================
// DATABASE
// Charge tout le fichier larsen.pgn
// ===============================

let games = [];

/**
 * Charge le fichier PGN unique.
 */
export async function initDatabase() {

    if (games.length) return;
    
    const response = await fetch(
    `${import.meta.env.BASE_URL}pgn/larsen.pgn`
);


    if (!response.ok) {

        throw new Error("Impossible de charger /pgn/larsen.pgn");

    }

    const text = await response.text();

    parsePGN(text);

}

/**
 * Découpe le PGN en plusieurs parties.
 */
function parsePGN(text) {

    const sections = text
        .split(/\n(?=\[Event )/)
        .filter(section => section.trim() !== "");

    games = sections.map(parseGame);

}

/**
 * Transforme une partie PGN en objet JS.
 */
function parseGame(section) {

    const headers = {};

    const regex = /\[(\w+)\s+"([^"]*)"]/g;

    let match;

    while ((match = regex.exec(section)) !== null) {

        headers[match[1]] = match[2];

    }

    const movesText = section

        .replace(/\[[^\]]*]/g, "")

        .replace(/\{[^}]*}/g, "")

        .replace(/\([^)]*\)/g, "")

        .replace(/\r/g, "")

        .replace(/\*/g, "")

        .trim();

    const moves = movesText

        .split(/\s+/)

        .filter(token =>

            token &&
            !token.includes(".") &&
            token !== "1-0" &&
            token !== "0-1" &&
            token !== "1/2-1/2"

        );

    return {

        event: headers.Event || "",

        variation: headers.Variation || "",

        eco: headers.ECO || "",

        white: headers.White || "",

        black: headers.Black || "",

        result: headers.Result || "",

        headers,

        moves

    };

}

// ===============================
// GETTERS
// ===============================

export function getGames() {

    return games;

}

export function getGame(index) {

    return games[index];

}

export function gameCount() {

    return games.length;

}