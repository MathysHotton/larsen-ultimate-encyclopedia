// ======================================
// HOME
// ======================================

const values = {

    "games-count":652,

    "moves-count":12500,

    "plans-count":850,

    "traps-count":320

};

Object.entries(values).forEach(([id,value])=>{

    const element=document.getElementById(id);

    if(element){

        element.textContent=value.toLocaleString("fr-FR");

    }

});

// ======================================
// CITATIONS
// ======================================

const quotes = [

    "« Celui qui ne prend jamais de risques ne découvrira jamais de nouvelles idées. » — Bent Larsen",

    "« Les ouvertures sont un moyen, jamais une fin. » — Bent Larsen",

    "« Une idée originale vaut parfois plus qu'une longue préparation. » — Bent Larsen",

    "« Les échecs récompensent le courage autant que la précision. » — Bent Larsen",

    "« Les meilleurs coups sont souvent ceux que personne n'attend. » — Bent Larsen",

    "« Le fou en b2 est l'âme de la Larsen. »"

];

const quote = document.getElementById("quote-line");

if (quote) {

    let current = Math.floor(Math.random() * quotes.length);

    const WRITE_SPEED = 45;      // ms par caractère
    const ERASE_SPEED = 25;
    const DISPLAY_TIME = 10000;

    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }

    async function write(text) {

        quote.textContent = "";

        for (let i = 0; i < text.length; i++) {

            quote.textContent += text[i];

            await sleep(WRITE_SPEED);

        }

    }

    async function erase() {

        while (quote.textContent.length > 0) {

            quote.textContent = quote.textContent.slice(0, -1);

            await sleep(ERASE_SPEED);

        }

    }

    async function loop() {

        while (true) {

            await write(quotes[current]);

            await sleep(DISPLAY_TIME);

            await erase();

            let next;

            do {

                next = Math.floor(Math.random() * quotes.length);

            }

            while (next === current);

            current = next;

        }

    }

    loop();

}